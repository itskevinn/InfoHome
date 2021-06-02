import { Publicacion } from './../../interfaces/publicacion';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  @Input() publicacion: Publicacion;

  constructor() { }

  ngOnInit() {
  }

}
