import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RentService } from '../services/rentService/rent.service'; // Importamos el servicio RentService
import { PropertyService } from '../services/propertyService/property.service';

@Component({
  selector: 'app-registro-viviendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-viviendas.component.html',
  styleUrls: ['./registro-viviendas.component.css']
})
export class RegistroViviendasComponent implements OnInit {
  propiedades: any[] = []; // Lista de propiedades obtenidas del backend
  propiedadesVisibles: any[] = []; // Para manejar la paginación
  maxPropiedadesPorPagina = 5; // Máximo de propiedades visibles por página
  mensajeSinPropiedades = "Aún no tienes propiedades registradas"; // Mensaje cuando no hay propiedades

  constructor(
    private propertyService: PropertyService,  // Inyectamos el RentService
    private rentService: RentService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inyectamos ChangeDetectorRef para forzar la detección de cambios
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser, "User");

        // Verificación adicional para asegurar que los datos son correctos
        if (parsedUser && parsedUser.userId) {
          this.propertyService.getByUserId(parsedUser.userId).subscribe({
            next: (data: any[]) => {
              this.propiedades = data;
      
              console.log('Datos recibidos:', data);
      
              if (this.propiedades.length > 0) {
                this.propiedadesVisibles = this.propiedades.slice(0, this.maxPropiedadesPorPagina);
                console.log('Propiedades visibles:', this.propiedadesVisibles); // Verifica las propiedades visibles
              } else {
                this.propiedadesVisibles = [];
              }
      
              // Forzar la detección de cambios si es necesario
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Error al obtener propiedades:', err);
            }
          });
        } else {
          this.router.navigate(['/login']);
          return;
        }
      } catch (e) {
        alert("Error al parsear los datos del usuario.");
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Método para cargar más propiedades (paginación)
  mostrarMas(): void {
    const start = this.propiedadesVisibles.length;
    
    console.log('Propiedades visibles antes de mostrar más:', this.propiedadesVisibles);
    
    const nextPropiedades = this.propiedades.slice(start, start + this.maxPropiedadesPorPagina);
    this.propiedadesVisibles = [...this.propiedadesVisibles, ...nextPropiedades];

    console.log('Propiedades visibles después de mostrar más:', this.propiedadesVisibles);
  }

  // Método para redirigir a la página de edición de detalles
  editarDetalles(propiedadId: number): void {
    this.router.navigate([`/editar-detalles/${propiedadId}`]); // Redirige al componente editar-detalles
  }

  // Método para confirmar el alquiler de la propiedad
  confirmarAlquiler(propiedadId: number): void {
    const confirmMessage = `¿Estás seguro de confirmar el alquiler para la propiedad con ID: ${propiedadId}?`;
    if (confirm(confirmMessage)) {
      // Actualizamos el estado de la propiedad a 'Alquilada'
      const rentToUpdate = this.propiedades.find(rent => rent.propertyId === propiedadId);
      if (rentToUpdate) {
        rentToUpdate.proofImage = rentToUpdate.proofImage; // Aquí puedes añadir la lógica para actualizar cualquier otro dato si es necesario
        this.rentService.update(rentToUpdate.rentId, rentToUpdate).subscribe({
          next: () => {
            alert('Alquiler confirmado exitosamente.');
            this.actualizarVista();
          },
          error: (err) => {
            console.error('Error al confirmar alquiler:', err);
            alert('Error al confirmar el alquiler.');
          }
        });
      }
    }
  }

  // Método para finalizar el alquiler de la propiedad
  finalizarAlquiler(propiedadId: number): void {
    const confirmMessage = `¿Estás seguro de finalizar el alquiler para la propiedad con ID: ${propiedadId}?`;
    if (confirm(confirmMessage)) {
      // Actualizamos el estado de la propiedad a 'No disponible'
      const rentToUpdate = this.propiedades.find(rent => rent.propertyId === propiedadId);
      if (rentToUpdate) {
        rentToUpdate.proofImage = rentToUpdate.proofImage; // Actualiza otros campos si es necesario
        this.rentService.update(rentToUpdate.rentId, rentToUpdate).subscribe({
          next: () => {
            alert('Alquiler finalizado exitosamente.');
            this.actualizarVista();
          },
          error: (err) => {
            console.error('Error al finalizar alquiler:', err);
            alert('Error al finalizar el alquiler.');
          }
        });
      }
    }
  }

  // Método para anular la reservación de la propiedad
  anularReservacion(propiedadId: number): void {
    const confirmMessage = `¿Estás seguro de anular la reservación para la propiedad con ID: ${propiedadId}?`;
    if (confirm(confirmMessage)) {
      // Actualizamos el estado de la propiedad a 'Disponible'
      const rentToUpdate = this.propiedades.find(rent => rent.propertyId === propiedadId);
      if (rentToUpdate) {
        rentToUpdate.proofImage = rentToUpdate.proofImage; // Actualiza otros campos si es necesario
        this.rentService.update(rentToUpdate.rentId, rentToUpdate).subscribe({
          next: () => {
            alert('Reservación anulada exitosamente.');
            this.actualizarVista();
          },
          error: (err) => {
            console.error('Error al anular reservación:', err);
            alert('Error al anular la reservación.');
          }
        });
      }
    }
  }

  // Método para actualizar la vista después de un cambio
  actualizarVista(): void {
    this.ngOnInit(); // Refresca las propiedades visibles
  }

  // Método para redirigir a la página principal
  irAPaginaMain(): void {
    this.router.navigate(['/pagina-main']);
  }
}
