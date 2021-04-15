import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroCasaPageRoutingModule } from './registro-casa-routing.module';

import { RegistroCasaPage } from './registro-casa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroCasaPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegistroCasaPage]
})
export class RegistroCasaPageModule {}
