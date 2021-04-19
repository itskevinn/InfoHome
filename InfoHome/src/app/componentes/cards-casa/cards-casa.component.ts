import { CasaService } from 'src/app/service/casa.service';
import { Publicacion } from './../../interfaces/publicacion';
import { Component, OnInit, Input } from '@angular/core';
import { Imagen } from 'src/app/interfaces/imagen';

@Component({
  selector: 'app-cards-casa',
  templateUrl: './cards-casa.component.html',
  styleUrls: ['./cards-casa.component.scss'],
})
export class CardsCasaComponent implements OnInit {
  @Input() publicacion: Publicacion
  imagenes: Imagen[]
  constructor(private casaService: CasaService) { }

  ngOnInit() {
    this.cargarCasa();
    this.cargarImagen();
  }
  cargarCasa() {
    console.log(this.publicacion);
    this.casaService.get(this.publicacion.idCasa).subscribe((c) => {
      this.publicacion.casa = c;
      console.log(this.publicacion);

    })
  }
  cargarImagen() {
    this.imagenes = this.publicacion.imagenes
    console.log(this.imagenes);
  }
}
