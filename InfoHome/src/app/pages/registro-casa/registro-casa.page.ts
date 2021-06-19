import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Casa } from 'src/app/interfaces/casa';
import { Usuario } from 'src/app/interfaces/usuario';
import { CasaService } from 'src/app/service/casa.service';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registro-casa',
  templateUrl: './registro-casa.page.html',
  styleUrls: ['./registro-casa.page.scss'],
})
export class RegistroCasaPage implements OnInit {
  ciudades: string[]
  departamentos: string[] = ["Cesar", "Guajira"]
  usuario: Usuario
  departamento: string
  casa: Casa
  ciudad: string
  formGroup: FormGroup
  currentUserSubject: any

  constructor(private casaService: CasaService, private storage: Storage, private formBuilder: FormBuilder, private toastController: ToastController, private modalController: ModalController) { }

  ngOnInit() {
    this.buildForm();
    this.getUser().then((u) => {
      u.subscribe((r) => {
        this.usuario = r;
      });
    });
  }
  buildForm() {
    this.casa = new Casa();
    this.casa.propietario = new Usuario();
    this.casa.barrio = '';
    this.casa.ciudad = '';
    this.casa.departamento = '';
    this.casa.direccion = '';
    this.casa.numeroDeBanos = '';
    this.casa.numeroDeCuartos = '';

    this.formGroup = this.formBuilder.group({
      barrio: [this.casa.barrio, [Validators.required]],
      direccion: [this.casa.direccion, [Validators.required]],
      numeroDeBanos: [this.casa.numeroDeBanos, [Validators.required]],
      numeroDeCuartos: [this.casa.numeroDeCuartos, [Validators.required]],
    })
  }
  async getUser() {
    await this.cargarUsuario();
    return this.currentUserSubject.asObservable();
  }
  consultarUsuario() {
    this.storage.get('usuarioLogeado').then((u) => {
      this.usuario = u;
    });
    console.log(this.usuario);
    return this.usuario;
  }
  async cargarUsuario() {
    const usuario = await this.storage.get('usuarioLogeado');
    if (usuario) {
      this.currentUserSubject = new BehaviorSubject<Usuario>(usuario);
    }
    return;
  }
  get control() {
    return this.formGroup.controls;
  }
  registrarCasa() {
    if (this.formGroup.invalid) {
      this.presentToast("Ingresa todos los datos para publicar tu casa!");
      return;
    }
    this.casa = this.formGroup.value;
    this.casa.id = '123'
    this.casa.ciudad = this.ciudad;
    this.casa.departamento = this.departamento;
    this.casa.propietario = this.usuario;
    this.casa.idUsuario = this.usuario.id;
    console.log(this.casa);
    this.casaService.save(this.casa).subscribe((c) => {
      this.casa = c
    });
    this.presentToast('Casa registrada correctamente');
    this.close();
  }

  close() {
    this.modalController.dismiss();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  cambiarDepartamento(value) {
    this.departamento = value
    this.validarCiudades(this.departamento);
  }
  cambiarCiudad(value) {
    this.ciudad = value
  }

  validarCiudades(departamento: string) {
    if (departamento == "Cesar") {
      this.ciudades = ["Valledupar", "Pueblo Bello"]
      return;
    }
    this.ciudades = ["Rioacha", "Maicao"]
  }


}
