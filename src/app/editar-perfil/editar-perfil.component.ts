import { Component, OnInit } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule si es standalone

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule, HttpClientModule], // Incluye HttpClientModule si es standalone
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Intentar obtener el usuario del localStorage
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Verificación adicional para asegurar que los datos son correctos
        if (parsedUser && parsedUser.name && parsedUser.userName) {
          this.usuario = parsedUser; // Asignación segura
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
        const parsedUser = JSON.parse(storedUser);

        // Verificar si el usuario tiene un ID válido
        if (parsedUser && parsedUser.userId) {
          this.userService.update(parsedUser.userId, this.usuario).subscribe({
            next: (updatedUser) => {
              alert('Perfil actualizado exitosamente');
              // Actualizar el usuario almacenado en localStorage
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              this.router.navigate(['/pagina-main']);
            },
            error: (err) => {
              console.error('Error al actualizar el perfil:', err);
              this.errorMessage = `Error al actualizar el perfil: ${err.message || err}`;
              alert('Error al actualizar el perfil, por favor intenta nuevamente');
            },
          });
        } else {
          this.errorMessage = 'El ID del usuario no es válido.';
        }
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
        this.errorMessage = 'Error al guardar los cambios.';
      }
    } else {
      this.errorMessage = 'No se pudo cargar la información del usuario.';
    }
  }
}
