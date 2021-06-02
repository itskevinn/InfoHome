import { PublicacionCasaPage } from './../pages/publicacion-casa/publicacion-casa.page';
import { ModalController } from '@ionic/angular';
import { Imagen } from './../interfaces/imagen';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../interfaces/publicacion';
import { PublicacionService } from '../service/publicacion.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private modalController: ModalController, private publicacionService: PublicacionService) { }
  fecha = new Date("06/11/2000")
  publicacionesEnVenta: Publicacion[] = []
  publicacionesEnArriendo: Publicacion[] = []

  ngOnInit() {
    this.recuperarPublicaciones();
  }

  recuperarPublicaciones() {
    this.publicacionService.getByType("Arriendo")
      .subscribe((p) => {
        this.publicacionesEnArriendo = p;
      });
    this.publicacionService.getByType("Venta")
      .subscribe((p) => {
        this.publicacionesEnVenta = p;
      });
  }

  doRefresh(event) {
    this.recuperarPublicaciones();
    event.target.complete();
  }
}
