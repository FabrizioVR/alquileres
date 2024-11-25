import { Component, OnInit } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NgIf, CommonModule, FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  usuario: User = {
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    direction: '',
    password: '',
    rol: 'CLIENTE',
  };

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Intentar obtener el usuario del localStorage
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
    } else {
      this.errorMessage = 'No hay un usuario almacenado. Debe iniciar sesión.';
    }
  }

  volver() {
    this.router.navigate(['/pagina-main']);
  }

  guardarCambios() {
    // Verificar si algún campo está vacío
    if (
      !this.usuario.name ||
      !this.usuario.lastName ||
      !this.usuario.dni ||
      !this.usuario.phone ||
      !this.usuario.direction ||
      !this.usuario.password
    ) {
      this.errorMessage = 'Error: Complete todos los campos.';
      return;
    }

    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        const usuario = JSON.parse(storedUser);

        // Verificar si el usuario tiene un ID válido
        if (usuario && usuario.userId) {
          this.userService.update(usuario.userId, this.usuario).subscribe({
            next: (updatedUser) => {
              alert('Perfil actualizado exitosamente');
              // Actualizar el usuario almacenado en localStorage
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              this.router.navigate(['/pagina-main']);
            },
            error: (err) => {
              console.error('Error al actualizar el perfil:', err);
              alert(
                'Error al actualizar el perfil, por favor intenta nuevamente.'
              );
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