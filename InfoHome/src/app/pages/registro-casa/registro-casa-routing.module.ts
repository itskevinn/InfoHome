import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroCasaPage } from './registro-casa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroCasaPageRoutingModule {}
