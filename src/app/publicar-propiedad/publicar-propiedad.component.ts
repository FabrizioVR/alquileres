import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../services/propertyService/property.service';
import { Property } from '../services/propertyService/property.model';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-publicar-propiedad',
  templateUrl: './publicar-propiedad.component.html',
  styleUrls: ['./publicar-propiedad.component.css'],
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [FormsModule] // Agrega FormsModule aquí
})
export class PublicarPropiedadComponent {
  property: Property = {
    propertyId: 0,
    userId: 0,
    nTitle: '',
    description: '',
    direction: '',
    availability: 'Disponible',
    type: '',
    capacity: 0,
    state: 'Activo'
  };

  images: File[] = [];

  constructor(private propertyService: PropertyService, private router: Router) {}

  onFileSelected(event: any) {
    this.images = Array.from(event.target.files);
  }

  onSubmit() {
    if (
      this.property.userId > 0 &&
      this.property.nTitle &&
      this.property.description &&
      this.property.direction &&
      this.property.availability &&
      this.property.type &&
      this.property.capacity > 0
    ) {
      this.propertyService.save(this.property).subscribe(
        (data: Property) => {
          console.log('Propiedad publicada:', data);
          alert('¡Propiedad publicada exitosamente!');
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

  regresar_publicarAmain() {
    this.router.navigate(['/pagina-main']);
  }
}
