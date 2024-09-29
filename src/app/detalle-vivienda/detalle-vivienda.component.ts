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


/*
Codigo ejemplo de 1 por 1

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-vivienda',
  templateUrl: './detalle-vivienda.component.html',
  styleUrls: ['./detalle-vivienda.component.css']
})
export class DetalleViviendaComponent implements OnInit {
  viviendaId!: number; // Para almacenar el ID de la vivienda
  vivienda: any; // Aquí almacenarás los datos de la vivienda seleccionada

  // Datos de las viviendas disponibles
  viviendas: any[] = [
    {
      id: 1,
      nombre: 'Vivienda Moderna',
      descripcion: 'Hermosa casa moderna con vista al mar.',
      precio: 150,
      servicios: ['Wifi', 'Cocina', 'Estacionamiento', 'Piscina'],
      telefono: '123-456-7891',
      qrImage: 'assets/qr-code-vivienda1.png' // Cambia esto por la ruta correcta
    },
    {
      id: 2,
      nombre: 'Apartamento Acogedor',
      descripcion: 'Apartamento céntrico ideal para parejas.',
      precio: 80,
      servicios: ['Wifi', 'Cocina'],
      telefono: '987-654-3210',
      qrImage: 'assets/qr-code-vivienda2.png' // Cambia esto por la ruta correcta
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtiene el ID de la vivienda desde la ruta
    this.viviendaId = Number(this.route.snapshot.paramMap.get('id'));

    // Busca la vivienda en el array `viviendas` usando el ID
    this.vivienda = this.viviendas.find(v => v.id === this.viviendaId);

    // Si no se encuentra la vivienda, redirige a la lista
    if (!this.vivienda) {
      this.regresar();
    }
  }

  // Método para regresar a la lista de viviendas
  regresar() {
    this.router.navigate(['']);
  }
}

*/