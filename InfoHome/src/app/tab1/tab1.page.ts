import { PublicacionCasaPage } from './../pages/publicacion-casa/publicacion-casa.page';
import { ModalController } from '@ionic/angular';
import { Imagen } from './../interfaces/imagen';
import { Usuario } from './../interfaces/usuario';
import { Component } from '@angular/core';
import { Publicacion } from '../interfaces/publicacion';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private modalController: ModalController) { }
  fecha = new Date("06/11/2000")
  usuario: Usuario = {
    apellido: "Pontón",
    nombre: "Kevin",
    correo: "Kevin@gmail.com",
    fechaNacimiento: this.fecha,
    id: "123",
    telefono: "3121111133",
    casas: [{
      barrio: "Mareiga",
      ciudad: "Valledupar",
      departamento: "Cesar",
      direccion: "Calle 64 # 02 - 1",
      numeroDeBanos: "5",
      numeroDeCuartos: "6",
      idPropietario: "123",
      tipo: "Venta",
      propietario: {
        apellido: "Pontón",
        nombre: "Kevin",
        correo: "Kevin@gmail.com",
        fechaNacimiento: this.fecha,
        id: "123",
        telefono: "3121111133",
        casas: []
      },
    }]
  }


}
