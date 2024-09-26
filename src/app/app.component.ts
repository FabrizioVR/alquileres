import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { RegistrarComponent } from './registrar/registrar.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { MainComponent } from './main/main.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrarComponent, IniciarSesionComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'alquileres';
}
