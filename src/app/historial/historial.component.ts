import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  alquileres: any[] = []; // Lista de alquileres obtenida del backend
  alquileresVisibles: any[] = []; // Controla los alquileres visibles en la interfaz
  maxAlquileresPorPagina = 5; // Máximo de alquileres por página

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerAlquileres().subscribe({
      next: (data: any[]) => {
        this.alquileres = data.sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
        this.alquileresVisibles = this.alquileres.slice(0, this.maxAlquileresPorPagina);
      },
      error: (err) => {
        console.error('Error al obtener los alquileres:', err);
      }
    });
  }

  obtenerAlquileres(): Observable<any[]> {
    return this.http.get<any[]>('http://tu-backend-api/alquileres'); // Cambiar a la URL del backend
  }

  mostrarMas(): void {
    const start = this.alquileresVisibles.length;
    const nextAlquileres = this.alquileres.slice(start, start + this.maxAlquileresPorPagina);
    this.alquileresVisibles = [...this.alquileresVisibles, ...nextAlquileres];
  }

  verComprobante(alquiler: any): void {
    alert(`Comprobante de la propiedad: ${alquiler.titulo}`); // Modificar según lo que necesites
  }

  regresar_listadoAmain() {
    this.router.navigate(['/pagina-main']); // Cambia esto si tu ruta es diferente
  }

}

