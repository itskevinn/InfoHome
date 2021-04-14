import { PublicacionCasaPageModule } from './../pages/publicacion-casa/publicacion-casa.module';
import { ComponentesModule } from './../componentes/componentes.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ComponentesModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
