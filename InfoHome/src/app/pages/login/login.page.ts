import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from './../../interfaces/usuario';
import { RegistroUsuarioPage } from './../registro-usuario/registro-usuario.page';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario
  USUARIOID: string = '3ZE4D6FI0R9S8M'
  constructor(private modalController: ModalController, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  async onLogin() {

    this.usuarioService.saveStorage('usuarioLogeado', this.usuario);
  }

  async onRegistrar() {
    const modal = await this.modalController.create({ 
      component: RegistroUsuarioPage,
      componentProps: {}
    });
    modal.present();
  }
  consultarUsuario() {
    this.usuarioService.get(this.USUARIOID).subscribe((u) =>
      this.usuario = u)
  }
}
