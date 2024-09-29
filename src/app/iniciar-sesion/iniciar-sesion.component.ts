import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  constructor(private router: Router) {}

  
  registrar() {
    this.router.navigate(['registrar']); // Cambia esto si tu ruta es diferente
  }


}
