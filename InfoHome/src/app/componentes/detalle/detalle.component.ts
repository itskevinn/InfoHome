import { Publicacion } from './../../interfaces/publicacion';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() publicacion: Publicacion

  constructor() { }

  ngOnInit() {
    console.log(this.publicacion)
  }

}
