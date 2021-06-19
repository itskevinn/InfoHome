import {Publicacion} from './../../interfaces/publicacion';
import {Component, OnInit, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() publicacion: Publicacion;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
