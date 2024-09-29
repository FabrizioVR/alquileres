import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pagina-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './pagina-main.component.html',
  styleUrl: './pagina-main.component.css'
})
export class PaginaMainComponent {

  title = 'prueba_angular';
}
