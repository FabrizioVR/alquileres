// src/app/main/main.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private router: Router) {}

  verViviendas() {
    this.router.navigate(['/listado-viviendas']); // Redirige a la ruta de listado de viviendas
  }
}
