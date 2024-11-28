import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-detalles',
  standalone: true, // Aseguramos que el componente es standalone
  imports: [CommonModule, FormsModule], // Importamos CommonModule y FormsModule
  templateUrl: './editar-detalles.component.html',
  styleUrls: ['./editar-detalles.component.css']
})
export class EditarDetallesComponent implements OnInit {
  propertyId: number = 0;
  property: Property = {
    userId: 1,
    title: '',
    description: '',
    image: '',
    direction: '',
    availability: 'Disponible',
    type: '',
    capacity: 1,
    additioFeatures: '', // Características adicionales
    price: 0,
    city: '',
    nRooms: 0, // Ajustado para que sea de tipo number
  };

  cities: string[] = ['Abancay', 'Arequipa', 'Ayacucho', 'Callao', 'Cajamarca', 'Cerro de Pasco', 'Chachapoyas', 'Chiclayo', 'Chimbote', 'Cusco', 'Huancavelica', 'Huancayo', 'Huanuco', 'Iquitos', 'Juliaca', 'Lima', 'Moquegua', 'Tacna', 'Tarapoto', 'Trujillo', 'Tumbes', 'Piura', 'Pt. Maldonado', 'Pucallpa'];
  selectedCity: string = '';
  rooms: number[] = [1, 2, 3, 4, 5];
  selectedRooms: number = 1;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la propiedad de la ruta
    this.propertyId = +this.route.snapshot.paramMap.get('id')!;
    this.getPropertyDetails();
  }

  getPropertyDetails(): void {
    this.propertyService.getById(this.propertyId).subscribe((data) => {
      this.property = data;
      this.selectedCity = this.property.city || '';
      this.selectedRooms = this.property.nRooms; // No es necesario convertir si nRooms es number
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.property.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // Aseguramos que los datos seleccionados sean asignados al objeto property
    this.property.city = this.selectedCity;
    this.property.nRooms = this.selectedRooms;

    this.propertyService.update(this.propertyId, this.property).subscribe(
      (data) => {
        console.log('Propiedad actualizada:', data);
        alert('¡Propiedad actualizada exitosamente!');
        this.router.navigate(['/registro-viviendas']);
      },
      (error) => {
        console.error('Error al actualizar la propiedad:', error);
        alert('Hubo un error al actualizar la propiedad.');
      }
    );
  }

  regresar(): void {
    this.router.navigate(['/registro-viviendas']);
  }
}
