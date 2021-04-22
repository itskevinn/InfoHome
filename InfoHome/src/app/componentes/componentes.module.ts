import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { HeaderPublicacionComponent } from './header-publicacion/header-publicacion.component';
import { SlideshowImagesComponent } from './slideshow-images/slideshow-images.component';
import { InsertarImagenCardComponent } from './insertar-imagen-card/insertar-imagen-card.component';
import { HeaderBackButtonComponent } from './header-back-button/header-back-button.component';
import { HeaderComponent } from './header/header.component';
import { SlideshowDetailsImagesComponent } from './slideshow-details-images/slideshow-details-images.component';
import { CardsCasaComponent } from './cards-casa/cards-casa.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';



@NgModule({
  declarations: [SlideshowBackdropComponent, CardsCasaComponent, SlideshowDetailsImagesComponent, HeaderBackButtonComponent, HeaderComponent, InsertarImagenCardComponent, SlideshowImagesComponent, HeaderPublicacionComponent, RegistrarUsuarioComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [SlideshowBackdropComponent, HeaderComponent, SlideshowDetailsImagesComponent,HeaderBackButtonComponent, InsertarImagenCardComponent, SlideshowImagesComponent, HeaderPublicacionComponent]
})
export class ComponentesModule { }
