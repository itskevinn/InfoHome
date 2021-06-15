import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {Publicacion} from '../../interfaces/publicacion';
import {DetallePage} from '../../pages/detalle/detalle.page';
import {PublicacionService} from '../../service/publicacion.service';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-slide-tipo-publicacion',
  templateUrl: './slide-tipo-publicacion.component.html',
  styleUrls: ['./slide-tipo-publicacion.component.scss'],
})
export class SlideTipoPublicacionComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() publicaciones: Publicacion[];
  publicacionesCompletas: Publicacion[];

  constructor(private modalController: ModalController, private publicacionService: PublicacionService) {
  }

  ngOnInit() {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones() {
    this.publicacionService.gets().subscribe(
      (r) => {
        this.publicaciones = r;
        this.publicacionesCompletas = r;
      });
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.publicaciones.length === this.publicacionesCompletas.length) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async verDetalle(publicacion: Publicacion) {
    const modal = await this.modalController.create({
      component: DetallePage,
      componentProps: {
        publicacion
      }
    });
    await modal.present();
  }

}


