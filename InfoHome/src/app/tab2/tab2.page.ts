import { Component } from '@angular/core';
import { Publicacion } from '../interfaces/publicacion';

import { PublicacionService } from '../service/publicacion.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  toggledSearchBar = true;
  sugerencias = ['Cesar', 'La Guajira', 'Valledupar', 'Albania'];
  textoBuscar: string;
  publicaciones: Publicacion[] = [];
  publicacionesEnVenta: Publicacion[] = [];
  publicacionesEnArriendo: Publicacion[] = [];
  resultado = false;

  constructor(private publicacionService: PublicacionService) { }

  toggleSearchBar() {

  }

  onSearchChange(event) {
    const buscar = event.detail.value;
    if (buscar.length === 0) {
      this.publicaciones = [];
      return;
    }

    this.publicacionService.getsBySearch(buscar).subscribe(respuesta => {
      this.publicaciones = respuesta;
      if (this.publicaciones.length === 0) {
        this.resultado = true;
        return;
      }
      this.resultado = false;
      this.porTipo(this.publicaciones);
    });
  }

  porTipo(p) {
    p.forEach(element => {
      if (element.tipo === 'Arriendo') {
        this.publicacionesEnArriendo.push(element);
      } else {
        this.publicacionesEnVenta.push(element);
      }
    });
  }
}
