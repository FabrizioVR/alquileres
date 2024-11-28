import { Component, OnInit } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  usuario: User = {
    name: '',
    lastName: '',
    userName: '',
    phone: '',
    password: '',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Intentar obtener el usuario almacenado en localStorage
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // Verificar que los datos del usuario son válidos
        if (parsedUser && parsedUser.userName) {
          this.usuario = parsedUser; // Asignar los datos del usuario
        } else {
          this.errorMessage = 'El usuario no tiene datos válidos.';
        }
      } catch (e) {
        this.errorMessage = 'Error al parsear los datos del usuario.';
      }
    } else {
      this.errorMessage = 'No hay un usuario almacenado. Debe iniciar sesión.';
    }
  }

  volver() {
    this.router.navigate(['/pagina-main']);
  }

  guardarCambios() {
    const storedUser = localStorage.getItem('currentUser');
  
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
  
        if (parsedUser && parsedUser.userId) {
          // Enviar el objeto completo de usuario actualizado
          this.userService.update(parsedUser.userId, this.usuario).subscribe({
            next: (updatedUser) => {
              // Mostrar mensaje de éxito y actualizar el localStorage
              this.successMessage = 'Perfil actualizado exitosamente.';
              this.errorMessage = '';
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              this.router.navigate(['/pagina-main']);
            },
            error: (err) => {
              console.error('Error al actualizar el perfil:', err);
              this.errorMessage = `Error al actualizar el perfil: ${err.message || err}`;
              this.successMessage = '';
            },
          });
        } else {
          this.errorMessage = 'El ID del usuario no es válido.';
        }
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
        this.errorMessage = 'Error al guardar los cambios.';
        this.successMessage = '';
      }
    } else {
      this.errorMessage = 'No se pudo cargar la información del usuario.';
    }
  }  
}