import { Publicacion } from './../../interfaces/publicacion';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards-casa',
  templateUrl: './cards-casa.component.html',
  styleUrls: ['./cards-casa.component.scss'],
})
export class CardsCasaComponent implements OnInit {
  @Input() publicacion: Publicacion
  constructor() { }

  ngOnInit() { }

}
