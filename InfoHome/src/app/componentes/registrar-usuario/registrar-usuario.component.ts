import { Component, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent implements OnInit {

  constructor( private toastController: ToastController, private modalController: ModalController ) { }

  ngOnInit() {}

  onClick(){
    this.presentToast();
  }

  onDismiss() {
    this.modalController.dismiss( dismissed => {
        dismissed = true;
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado correctamente.',
      duration: 2000
    });
    toast.present();
  }
}
