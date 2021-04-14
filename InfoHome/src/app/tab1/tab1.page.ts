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

  fecha = new Date("06/11/2000")
  usuario: Usuario = {
    apellido: "Pontón",
    nombre: "Kevin",
    correo: "Kevin@gmail.com",
    fechaNacimiento: this.fecha,
    id: "123",
    telefono: "3121111133"
  }
  imagenes: Imagen[] = []
  publicaciones: Publicacion[] = [
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    }
  ]
  publicaciones2: Publicacion[] = [
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    },
    {
      casa: {
        direccion: "Calle 64 #13 - 5",
        numeroDeBaños: "3",
        numeroDeCuartos: "4",
        propietario: this.usuario,
        tipo: "Arriendo"
      },
      detalle: "Apartamento en valledupar, ubicado en mareigua, cuenta con 4 alcobas, 3 baños, sala, comedor",
      fecha: this.fecha,
      titulo: "Apartamento en arriendo",
      id: "123",
      usuario: this.usuario,
      imagenes: this.imagenes
    }
  ]
  constructor(private modalController: ModalController) { }

}
