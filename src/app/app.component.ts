// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginaMainComponent } from "./pagina-main/pagina-main.component";  // Agrega esta línea

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, PaginaMainComponent] // Agrega esta línea
  // Agrega esta línea
})
export class AppComponent {
  title = 'Aplicación de Alquileres';
}
