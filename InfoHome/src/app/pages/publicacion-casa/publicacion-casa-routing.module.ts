import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionCasaPage } from './publicacion-casa.page';

const routes: Routes = [
  {
    path: 'Publicacion',
    component: PublicacionCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionCasaPageRoutingModule {}
