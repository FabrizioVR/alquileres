import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

  constructor(private router: Router) {}

  
  volerInicio() {
    this.router.navigate(['']); // Cambia esto si tu ruta es diferente
  }

}
