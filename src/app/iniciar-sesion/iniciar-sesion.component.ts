import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})

export class IniciarSesionComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  registrar() {
    this.router.navigate(['registrar']);
  }

  login() {
    this.errorMessage = ''; // Reiniciar el mensaje de error

    this.userService.login(this.userName, this.password).subscribe(
      (user: User) => {
        if (user) {
          // Guardar la información del usuario en el servicio y localStorage
          this.userService.setAuthenticated(user);
          this.router.navigate(['pagina-main']); // Redirigir a la página principal
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      },
      (error) => {
        // Manejo de errores
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
        }
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}