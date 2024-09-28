import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css']
})
export class DetalleViviendaComponent implements OnInit {
  viviendaId!: number; // Para almacenar el ID de la vivienda
  vivienda: any; // Aquí almacenarás los datos de la vivienda

  constructor(private route: ActivatedRoute, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    // Obtiene el ID de la vivienda desde la ruta
    this.viviendaId = Number(this.route.snapshot.paramMap.get('id'));

    // Aquí deberías cargar los datos de la vivienda
    this.vivienda = {
      id: this.viviendaId,
      nombre: 'Ejemplo de Vivienda',
      descripcion: 'Descripción de la vivienda.',
      precio: 100,
      servicios: ['Wifi', 'Cocina', 'Aire Acondicionado'],
      telefono: '123-456-7890', // Número de teléfono
      qrImage: 'path/to/qrcode.jpg' // Ruta a la imagen del QR
    };
  }

  // Método para regresar a la lista de viviendas
  regresar() {
    this.router.navigate(['']); // Cambia esto si tu ruta es diferente
  }
}
