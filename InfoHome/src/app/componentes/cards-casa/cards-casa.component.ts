import { CasaService } from 'src/app/service/casa.service';
import { Publicacion } from './../../interfaces/publicacion';
import { Component, OnInit, Input } from '@angular/core';
import { Imagen } from 'src/app/interfaces/imagen';
import { Storage } from '@ionic/storage';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cards-casa',
  templateUrl: './cards-casa.component.html',
  styleUrls: ['./cards-casa.component.scss'],
})
export class CardsCasaComponent implements OnInit {

  @Input() publicacion: Publicacion;
  imagenes: Imagen[];

  constructor(private casaService: CasaService, private storage: Storage) { }

  ngOnInit() {
    this.cargarCasa();
    this.cargarImagen();
    this. cargarPropietario();
  }
  cargarCasa() {
    console.log(this.publicacion);
    this.casaService.get(this.publicacion.idCasa).subscribe((c) => {
      this.publicacion.casa = c;
    });
  }

  async cargarPropietario() {
    await this.storage.get('usuarioLogeado').then((u: Usuario) => {
      this.publicacion.casa.propietario = u;
    });
  }

  cargarImagen() {
    this.imagenes = this.publicacion.imagenes;
    console.log(this.imagenes);
  }
}
