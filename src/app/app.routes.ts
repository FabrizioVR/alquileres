// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ListadoViviendasComponent } from './listado-viviendas/listado-viviendas.component';
import { DetalleViviendaComponent } from './detalle-vivienda/detalle-vivienda.component';

export const routes: Routes = [
  { path: '', component: ListadoViviendasComponent },
  { path: 'detalle/:id', component: DetalleViviendaComponent }
];
