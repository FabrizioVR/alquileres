import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})

export class EditarPerfilComponent {
  // Usuario que se va a editar
  usuario = {
    nombre: '',
    correo: '',
    contrasena: ''
  };

  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/pagina-main']); // Cambia esto si tu ruta es diferente
  }

  // Método para manejar el guardado de cambios
  guardarCambios() {
    console.log('Cambios guardados:', this.usuario);
    // Aquí puedes agregar la lógica para enviar los cambios al backend
  }
}