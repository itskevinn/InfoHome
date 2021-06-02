import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from './../../interfaces/usuario';
import { RegistroUsuarioPage } from './../registro-usuario/registro-usuario.page';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario;
  USUARIOID = 'MLIT5MEH1GFMAT';

  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  existeUsuarioLogeado(): void {
    if (this.storage.get('usuarioLogeado')) {
      this.router.navigate(['/tabs']);
    }
  }

  async onLogin() {
    this.consultarUsuario();
  }

  async onRegistrar() {
    const modal = await this.modalController.create({
      component: RegistroUsuarioPage,
      componentProps: {}
    });
    modal.present();
  }

  consultarUsuario() {
    this.usuarioService.get(this.USUARIOID).subscribe((u) => {
      this.usuario = u;
    });
  }
}
