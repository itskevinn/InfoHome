import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PublicacionCasaPageModule } from './pages/publicacion-casa/publicacion-casa.module';
import { ComponentesModule } from './componentes/componentes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {File} from '@ionic-native/file/ngx'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentesModule, PublicacionCasaPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ImagePicker, File],
  bootstrap: [AppComponent],
})
export class AppModule { }
