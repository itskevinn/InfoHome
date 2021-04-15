import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Casa } from 'src/app/interfaces/casa';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-registro-casa',
  templateUrl: './registro-casa.page.html',
  styleUrls: ['./registro-casa.page.scss'],
})
export class RegistroCasaPage implements OnInit {
  tipos: string[] = ["Arriendo", "Venta"]
  ciudades: string[]
  departamentos: string[] = ["Cesar", "Guajira"]
  tipo: string
  departamento: string
  casa: Casa
  ciudad: string
  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.buildForm();
  }
  consultarUsuario() {
    let usuario = new Usuario()
    usuario.id = '123';
    usuario.apellido = "Pontón";
    usuario.nombre = "Kevin"
    usuario.correo = " kvin@gmail.com"
    usuario.fechaNacimiento = new Date("06/11/2000");
    usuario.telefono = "3102999911"
    return usuario;
  }
  get control() {
    return this.formGroup.controls;
  }
  registrarCasa() {
    if (this.formGroup.invalid) {
      this.presentToast("Ingresa todos los datos para publicar tu casa!");
      return;
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  buildForm() {
    this.casa = new Casa();
    this.casa.barrio = '';
    this.casa.ciudad = '';
    this.casa.departamento = '';
    this.casa.direccion = '';
    this.casa.numeroDeBanos = '';
    this.casa.numeroDeCuartos = '';
    this.casa.tipo = '';
    this.casa.idPropietario = this.consultarUsuario().id;
    this.formGroup = this.formBuilder.group({
      barrio: [this.casa.barrio, [Validators.required]],
      ciudad: [this.casa.ciudad, [Validators.required]],
      departamento: [this.casa.departamento, [Validators.required]],
      direccion: [this.casa.direccion, [Validators.required]],
      numeroDeBanos: [this.casa.numeroDeBanos, [Validators.required]],
      numeroDeCuartos: [this.casa.numeroDeCuartos, [Validators.required]],
      tipo: [this.casa.tipo, [Validators.required]]
    })
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
  cambiarTipo(value) {
    this.tipo = value;
  }

}
