import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../services/propertyService/property.model';
import { PropertyService } from '../services/propertyService/property.service';
import { RentService } from '../services/rentService/rent.service';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';
import { Rent } from '../services/rentService/rent.model';

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css'],
})
export class DetalleViviendaComponent implements OnInit {
  viviendaId!: number;
  vivienda!: Property;
  errorMessage: string = '';
  comprobanteNombre: string = ''; // Nombre del archivo del comprobante seleccionado
  comprobanteArchivo: File | null = null; // Archivo del comprobante
  renta!: Rent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private rentService: RentService,
    private userService: UserService,
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
      },
      (error) => {
        console.error('Error al obtener detalles de la vivienda:', error);
        this.errorMessage = 'Error al cargar los detalles de la vivienda.';
        this.regresar();
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

    const storedUser = localStorage.getItem('currentUser');
    
    
    if (storedUser){
      let user: User = JSON.parse(storedUser);

      this.rentService.save({
        userId: user.userId ? user.userId : 1,
        propertyId: this.viviendaId,
        proofImage: "",
        startDate: Date(),
        endDate: Date(),
      }).subscribe(
        (data) => {
          this.renta = data;
        },
        (error) => {
          console.error('Error al obtener detalles de la renta:', error);
          this.errorMessage = 'Error al cargar los detalles de la renta.';
          this.regresar();
        }
      );
    }

  }

  regresar(): void {
    this.router.navigate(['/listado-viviendas']);
  }
}
