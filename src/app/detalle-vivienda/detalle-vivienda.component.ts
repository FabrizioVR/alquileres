import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css'],
})
export class DetalleViviendaComponent implements OnInit {
  viviendaId!: number;
  vivienda!: Property;
  usuario!: User;
  errorMessage: string = '';
  comprobanteNombre: string = ''; // Nombre del archivo del comprobante seleccionado
  comprobanteArchivo: File | null = null; // Archivo del comprobante

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.viviendaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.viviendaId) {
      this.errorMessage = 'ID de vivienda inválido';
      this.regresar();
      return;
    }

    // Obtener los detalles de la vivienda
    this.propertyService.getById(this.viviendaId).subscribe(
      (data) => {
        this.vivienda = data;
        if (this.vivienda.userId) this.obtenerUsuario(this.vivienda.userId);
      },
      (error) => {
        console.error('Error al obtener detalles de la vivienda:', error);
        this.errorMessage = 'Error al cargar los detalles de la vivienda.';
        this.regresar();
      }
    );
  }

  obtenerUsuario(userId: number): void {
    if (!userId) {
      this.errorMessage = 'ID de usuario inválido.';
      return;
    }

    this.userService.getById(userId).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
        this.errorMessage = 'Error al cargar la información del usuario.';
      }
    );
  }

  // Método para manejar la selección de un archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.comprobanteArchivo = input.files[0];
      this.comprobanteNombre = this.comprobanteArchivo.name;

      // Simulación de la subida del archivo al servidor
      const formData = new FormData();
      formData.append('comprobante', this.comprobanteArchivo);

      console.log('Subiendo comprobante:', this.comprobanteArchivo.name);
      alert(`El comprobante "${this.comprobanteArchivo.name}" se ha subido correctamente.`);
    }
  }

  realizarAlquiler(): void {
    alert('Solicitud de Alquiler Enviada Correctamente');
    alert('Su vivienda estara en estado de Reservado mientras se espera la respuesta del propietario');
    // Aquí puedes implementar la lógica para realizar el alquiler.
  }

  regresar(): void {
    this.router.navigate(['/listado-viviendas']);
  }
}