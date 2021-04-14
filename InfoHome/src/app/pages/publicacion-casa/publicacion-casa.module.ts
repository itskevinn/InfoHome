import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ComponentesModule } from './../../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionCasaPageRoutingModule } from './publicacion-casa-routing.module';

import { PublicacionCasaPage } from './publicacion-casa.page';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionCasaPageRoutingModule,
    ComponentesModule,
  ],
  providers: [ImagePicker, File],
  declarations: [PublicacionCasaPage]
})
export class PublicacionCasaPageModule { }
