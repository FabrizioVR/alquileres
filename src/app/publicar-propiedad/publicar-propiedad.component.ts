import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-publicar-propiedad',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './publicar-propiedad.component.html',
  styleUrl: './publicar-propiedad.component.css'
})

export class PublicarPropiedadComponent {
  
  
  property = {
    title: '',
    description: '',
    price: 0,
    services: '',
    phone: '',
    qrImage: '',
    images: []
    
  };

  onFileSelected(event: any) {
    const files = event.target.files;
    this.property.images = files;  // Guardar las imágenes seleccionadas
  }

  onSubmit() {
    if (this.property.title && this.property.description && this.property.price) {
      // Lógica para enviar los datos al servidor
      console.log('Propiedad publicada:', this.property);
      alert('¡Propiedad publicada exitosamente!');
    } else {
      alert('Por favor complete todos los campos.');
    }
  }

  constructor(private router: Router) {}


  regresar_publicarAmain() {
    this.router.navigate(['/pagina-main']); // Cambia esto si tu ruta es diferente
  }
}
