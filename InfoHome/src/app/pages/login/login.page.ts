import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { RegistrarUsuarioComponent } from 'src/app/componentes/registrar-usuario/registrar-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private modalController: ModalController ) { }

  ngOnInit() {
  }

  onClick(){}

  async onRegistrar() {
    const modal = await this.modalController.create({
      component: RegistrarUsuarioComponent,
      componentProps: { }
    });
    modal.present();
  }
}
