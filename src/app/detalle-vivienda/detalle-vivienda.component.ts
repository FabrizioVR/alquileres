import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { RentService } from '../services/rentService/rent.service';
import { UserService } from '../services/userService/user.service';
import { Rent } from '../services/rentService/rent.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-detalle-vivienda',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css'],
})
export class DetalleViviendaComponent implements OnInit {
  viviendaId!: number;
  vivienda!: Property;
  errorMessage: string = '';
  comprobanteNombre: string = ''; // Nombre del archivo del comprobante seleccionado
  comprobanteArchivo: File | null = null; // Archivo del comprobante
  renta!: Rent;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private rentService: RentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.viviendaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.viviendaId) {
      this.errorMessage = 'ID de vivienda inválido';
      this.regresar();
      return;
    }

    // Obtener los detalles de la vivienda
    this.propertyService.getById(this.viviendaId).subscribe(
      (data) => {
        this.vivienda = data;
      },
      (error) => {
        console.error('Error al obtener detalles de la vivienda:', error);
        this.errorMessage = 'Error al cargar los detalles de la vivienda.';
        this.regresar();
      }
    );
  }

  // Método para manejar la selección de un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.comprobanteArchivo = input.files[0];
      this.comprobanteNombre = this.comprobanteArchivo.name;
    }
  }

  realizarAlquiler(): void {
    // Validación simple de las fechas
    if (!this.startDate || !this.endDate) {
      alert('Por favor, seleccione un rango de fechas válido.');
      return;
    }

    alert('Solicitud de Alquiler Enviada Correctamente');
    alert('Su vivienda estará en estado de Reservado mientras se espera la respuesta del propietario');

    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      let user = JSON.parse(storedUser);

      // Crear objeto de renta con los datos de alquiler
      this.rentService
        .save({
          userId: user.userId ? user.userId : 1,
          propertyId: this.viviendaId,
          proofImage: this.comprobanteNombre, // Usamos el nombre del archivo del comprobante
          startDate: this.startDate?.toISOString() || '',
          endDate: this.endDate?.toISOString() || '',
        })
        .subscribe(
          (data) => {
            this.renta = data;
            // Cambiar estado de la propiedad a "Reservada"
            this.cambiarEstadoPropiedad('Reservada');
          },
          (error) => {
            console.error('Error al registrar la renta:', error);
            this.errorMessage = 'Error al procesar la renta.';
          }
        );
    }
  }

  cambiarEstadoPropiedad(nuevoEstado: string): void {
    this.propertyService.updateState(this.viviendaId, nuevoEstado).subscribe(
      (response) => {
        console.log(`Estado de la propiedad actualizado a ${nuevoEstado}:`, response);
        this.vivienda.availability = nuevoEstado; // Actualiza el estado localmente
      },
      (error) => {
        console.error('Error al actualizar el estado de la propiedad:', error);
      }
    );
  }

  regresar(): void {
    this.router.navigate(['/listado-viviendas']);
  }
}
