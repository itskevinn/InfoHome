import {RegistrarUsuarioComponent} from './registrar-usuario/registrar-usuario.component';
import {SlideshowImagesComponent} from './slideshow-images/slideshow-images.component';
import {InsertarImagenCardComponent} from './insertar-imagen-card/insertar-imagen-card.component';
import {HeaderBackButtonComponent} from './header-back-button/header-back-button.component';
import {HeaderComponent} from './header/header.component';
import {SlideshowDetailsImagesComponent} from './slideshow-details-images/slideshow-details-images.component';
import {CardsCasaComponent} from './cards-casa/cards-casa.component';
import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideshowBackdropComponent} from './slideshow-backdrop/slideshow-backdrop.component';
import {SlideTipoPublicacionComponent} from './slide-tipo-publicacion/slide-tipo-publicacion.component';


@NgModule({
    declarations: [
        SlideshowBackdropComponent,
        CardsCasaComponent,
        SlideshowDetailsImagesComponent,
        HeaderBackButtonComponent,
        HeaderComponent,
        InsertarImagenCardComponent,
        SlideshowImagesComponent,
        RegistrarUsuarioComponent,
        SlideTipoPublicacionComponent
    ],
  imports: [
    CommonModule,
    IonicModule
  ],
    exports: [
        SlideshowBackdropComponent,
        HeaderComponent,
        SlideshowDetailsImagesComponent,
        InsertarImagenCardComponent,
        SlideshowImagesComponent,
        SlideTipoPublicacionComponent
    ]
})
export class ComponentesModule {
}
