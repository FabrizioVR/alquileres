import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-pagina-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './pagina-main.component.html',
  styleUrls: ['./pagina-main.component.css'],
})
export class PaginaMainComponent implements OnInit {
  usuarioAutenticado: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe((estado) => {
      this.usuarioAutenticado = estado;
    });
  }

  // Métodos existentes para navegación
  alquilar() {
    this.router.navigate(['/listado-viviendas']);
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  iniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  publicar() {
    if (this.usuarioAutenticado) {
      this.router.navigate(['/publicar']);
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  historial() {
    if (this.usuarioAutenticado) {
      this.router.navigate(['/historial']);
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  registroViviendas() {
    if (this.usuarioAutenticado) {
      this.router.navigate(['/registro-viviendas']);
    } else {
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  cerrarSesion(): void {
    this.userService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}