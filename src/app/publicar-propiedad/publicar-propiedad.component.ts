import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-publicar-propiedad',
  templateUrl: './publicar-propiedad.component.html',
  styleUrls: ['./publicar-propiedad.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
})
export class PublicarPropiedadComponent implements OnInit {
  property: Property = {
    userId: 1,
    nTitle: '',
    description: '',
    direction: '',
    availability: 'Disponible',
    type: '',
    capacity: 1,
    state: 'Activa',
    features: '', // Nueva propiedad para características adicionales
    cost: 0,
    city: '',
    rooms: '',
  };

  images: File[] = []; // Almacena las imágenes seleccionadas
  loggedUserId = 0;

  // Nueva lista de ciudades y propiedad seleccionada
  cities: string[] = ['Abancay', 'Arequipa', 'Ayacucho', 'Callao', 'Cajamarca', 'Cerro de Pasco', 'Chachapoyas', 'Chiclayo', 'Chimbote', 'Cusco', 'Huancavelica', 'Huancayo', 'Huanuco', 'Iquitos', 'Juliaca', 'Lima', 'Moquegua', 'Tacna', 'Tarapoto', 'Trujillo', 'Tumbes', 'Piura', 'Pt. Maldonado', 'Pucallpa'];
  selectedCity: string = '';

  // Array de números de habitaciones
  rooms: number[] = [1, 2, 3, 4, 5];
  selectedRooms: number = 1;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loggedUserId = parseInt(localStorage.getItem('userId') || '0', 10);
  }

  // Capturar los archivos seleccionados por el usuario
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }

  // Manejar el envío del formulario de publicación de la propiedad
  onSubmit(event: any) {
    if (event.target.checkValidity()) {
      const propertyData: Property = {
        ...this.property,
        direction: this.selectedCity, // Asignar la ciudad seleccionada como dirección
        features: this.property.features, // Asegurarse de que las características adicionales estén enviadas
      };

      // Realizar la llamada al servicio
      this.propertyService.save(propertyData).subscribe(
        (data: Property) => {
          console.log('Propiedad publicada:', data);
          alert('¡Propiedad publicada exitosamente!');

          // Aquí puedes manejar la carga de imágenes si es necesario
          if (data.propertyId) {
            this.uploadImages(data.propertyId);
          }

          this.router.navigate(['/pagina-main']);
        },
        (error: any) => {
          console.error('Error al publicar la propiedad:', error);
          alert('Hubo un error al publicar la propiedad.');
        }
      );
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  // Método para cargar las imágenes después de guardar la propiedad
  uploadImages(propertyId: number) {
    if (this.images.length > 0) {
      const formData = new FormData();
      this.images.forEach((image) => {
        formData.append('images', image);
      });
      // Llamar a otro servicio o método aquí para subir las imágenes usando propertyId
    }
  }

  regresar_publicarAmain() {
    this.router.navigate(['/pagina-main']);
  }
}
