import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerPropiedades().subscribe({
      next: (data: any[]) => {
        this.propiedades = data;
        this.propiedadesVisibles = this.propiedades.slice(0, this.maxPropiedadesPorPagina);
      },
      error: (err) => {
        console.error('Error al obtener propiedades:', err);
      }
    });
  }

  obtenerPropiedades(): Observable<any[]> {
    // Reemplaza con la URL de tu backend
    return this.http.get<any[]>('http://tu-backend-api/propiedades');
  }

  mostrarMas(): void {
    const start = this.propiedadesVisibles.length;
    const nextPropiedades = this.propiedades.slice(start, start + this.maxPropiedadesPorPagina);
    this.propiedadesVisibles = [...this.propiedadesVisibles, ...nextPropiedades];
  }

  editarDetalles(propiedadId: number): void {
    this.router.navigate([`/propiedad/detalles/${propiedadId}`]); // Navega a una página de edición
  }

  confirmarAlquiler(propiedadId: number): void {
    alert(`Alquiler confirmado para la propiedad con ID: ${propiedadId}`);
  }

  finalizarAlquiler(propiedadId: number): void {
    alert(`Alquiler finalizado para la propiedad con ID: ${propiedadId}`);
  }

  anularReservacion(propiedadId: number): void {
    alert(`Reservación anulada para la propiedad con ID: ${propiedadId}`);
  }
}

