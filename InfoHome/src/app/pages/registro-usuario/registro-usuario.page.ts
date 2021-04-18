import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  latest_date: string;
  usuario: Usuario
  fechaNacimiento = new Date()
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, public modalController: ModalController, private toastController: ToastController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.usuario = new Usuario();
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.fechaNacimiento = new Date()
    this.usuario.telefono = ''
    this.formGroup = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      correo: [this.usuario.correo, [Validators.required, Validators.email]],
      fechaNacimiento: [this.usuario.fechaNacimiento, Validators.required],
      telefono: [this.usuario.telefono, Validators.required]
    })
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      this.presentToast("Ingresa todos los datos para registrarte");
      return;
    }
    this.registrarUsuario();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  cambiarFechaNacimiento(event) {
    this.fechaNacimiento = event.detail.value
  }
  registrarUsuario() {
    this.usuario = this.formGroup.value;
    this.usuario.id = '123'
    this.usuarioService.save(this.usuario).subscribe((r) =>
      this.usuario = r
    )
    this.formGroup.reset();
  }
  close() {
    this.modalController.dismiss();
  }
  get control() {
    return this.formGroup.controls;
  }
}
