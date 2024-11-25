import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  telefono: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  volverInicio() {
    this.router.navigate(['']);
  }

  registrar() {
    this.errorMessage = ''; // Limpiar el mensaje de error previo.

    if (!this.nombre || !this.apellido || !this.usuario || !this.telefono || !this.contrasena || !this.confirmarContrasena) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (!/^\d+$/.test(this.telefono)) {
      this.errorMessage = 'El número de teléfono debe contener solo dígitos.';
      return;
    }

    const newUser: User = {
      name: this.nombre,
      lastName: this.apellido,
      userName: this.usuario,
      phone: this.telefono,
      password: this.contrasena,
    };

    this.isLoading = true;

    this.userService.save(newUser).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['pagina-main']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 409) {
          this.errorMessage = 'El usuario ya existe. Intenta con otro nombre.';
        } else {
          this.errorMessage = 'Ocurrió un error durante el registro.';
        }
        console.error('Error:', error);
      },
    });
  }
}
