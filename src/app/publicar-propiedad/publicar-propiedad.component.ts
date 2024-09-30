import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-publicar-propiedad',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './publicar-propiedad.component.html',
  styleUrls: ['./publicar-propiedad.component.css'],
})
export class PublicarPropiedadComponent implements OnInit {
  property: Property = {
    userId: 1,
    nTitle: '',
    description: '',
    direction: '',
    availability: 'Disponible',
    type: '',
    capacity: 1,
    state: 'Activa',
  };

  images: File[] = []; // Almacena las imágenes seleccionadas
  user: User | undefined;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const loggedUserId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (loggedUserId > 0) {
      this.userService.getById(loggedUserId).subscribe(
        (user: User) => {
          this.user = user;
          this.property.userId = user.userId || 1;
        },
        (error: any) => {
          console.error('Error al obtener el usuario:', error);
          alert('Hubo un problema al obtener la información del usuario.');
        }
      );
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }

  onSubmit(event: any) {
    if (event.target.checkValidity()) {
      const propertyData: Property = {
        ...this.property,
      };

      this.propertyService.save(propertyData).subscribe(
        (data: Property) => {
          console.log('Propiedad publicada:', data);
          alert('¡Propiedad publicada exitosamente!');

          if (data.propertyId) {
            this.uploadImages(data.propertyId);
          }

          this.router.navigate(['/pagina-main']);
        },
        (error: any) => {
          console.error('Error al publicar la propiedad:', error);
          alert('Hubo un error al publicar la propiedad.');
        }
      );
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  uploadImages(propertyId: number) {
    if (this.images.length > 0) {
      const formData = new FormData();
      this.images.forEach((image) => {
        formData.append('images', image);
      });
    }
  }

  regresar_publicarAmain() {
    this.router.navigate(['/pagina-main']);
  }
}
