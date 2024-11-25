import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginaMainComponent } from './pagina-main/pagina-main.component';
import { EditarPerfilComponent } from "./editar-perfil/editar-perfil.component"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, PaginaMainComponent, EditarPerfilComponent]
})
export class AppComponent {
  title = 'Aplicación de Alquileres';
}