// src/app/listado-viviendas/listado-viviendas.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Definición de la interfaz Vivienda
interface Vivienda {
  id: number;
  nombre: string;
  estado: string;  // Agregar el atributo `estado`
}

@Component({
  selector: 'app-listado-viviendas',
  templateUrl: './listado-viviendas.component.html',
  styleUrls: ['./listado-viviendas.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListadoViviendasComponent {
  // Lista de viviendas con id, nombre y estado
  viviendas: Vivienda[] = [
    { id: 1, nombre: 'Vivienda 1', estado: 'Disponible' },
    { id: 2, nombre: 'Vivienda 2', estado: 'Ocupada' },
    { id: 3, nombre: 'Vivienda 3', estado: 'En Mantenimiento' },
    { id: 4, nombre: 'Vivienda 4', estado: 'Disponible' },
    { id: 5, nombre: 'Vivienda 5', estado: 'Disponible' },
    { id: 6, nombre: 'Vivienda 6', estado: 'Ocupada' },
    { id: 7, nombre: 'Vivienda 7', estado: 'En Mantenimiento' },
    { id: 8, nombre: 'Vivienda 8', estado: 'Disponible' }
    
  ];

  constructor(private router: Router) {}

  // Método para navegar a los detalles de la vivienda seleccionada
  verDetalles(id: number) {
    this.router.navigate(['/detalle', id]);
  }

  // Método para obtener la clase CSS según el estado de la vivienda
  getEstadoClase(estado: string): string {
    switch (estado) {
      case 'Disponible':
        return 'estado-disponible';
      case 'Ocupada':
        return 'estado-ocupada';
      case 'En Mantenimiento':
        return 'estado-mantenimiento';
      default:
        return '';
    }
  }

  regresar_listadoAmain() {
    this.router.navigate(['/pagina-main']); // Cambia esto si tu ruta es diferente
  }

}
