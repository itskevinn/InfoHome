import { Imagen } from './../../interfaces/imagen';
import { PublicacionService } from './../../service/publicacion.service';
import { Publicacion } from './../../interfaces/publicacion';
import { Casa } from './../../interfaces/casa';
import { Usuario } from './../../interfaces/usuario';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { IonSlides, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { randomInt } from 'crypto';

@Component({
  selector: 'app-publicacion-casa',
  templateUrl: './publicacion-casa.page.html',
  styleUrls: ['./publicacion-casa.page.scss'],
})
export class PublicacionCasaPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  activeIndex: number = 0
  departamentos: string[] = ["Cesar", "Guajira"]
  ciudades: string[]
  publicacion: Publicacion
  ciudad: string
  imagen: Imagen
  tipo: string
  imagenes: Imagen[] = []
  usuario: Usuario
  tipos: string[] = ["Arriendo", "Venta"]
  formGroup: FormGroup
  casa: Casa
  departamento: string
  constructor(private router: Router, private imgPicker: ImagePicker, private publicacionService: PublicacionService, private toastController: ToastController, private file: File, private formBuilder: FormBuilder,) { }
  ngOnInit() {
    this.buildForm();
    this.mapearPublicacion();
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
  volver() {
    return this.router.dispose;
  }
  cambiarDepartamento(value) {
    this.departamento = value
    this.validarCiudades(this.departamento);
  }
  cambiarCiudad(value) {
    this.ciudad = value
  }
  private buildForm() {
    this.publicacion = new Publicacion();
    this.casa = new Casa()
    this.publicacion.titulo = '';
    this.publicacion.detalle = '';
    this.publicacion.usuario = this.consultarUsuario();
    this.casa.barrio = '';
    this.casa.ciudad = '';
    this.casa.departamento = '';
    this.casa.direccion = '';
    this.casa.numeroDeBanos = '';
    this.casa.numeroDeCuartos = '';
    this.casa.tipo = '';
    this.casa.propietario = this.consultarUsuario();
    this.formGroup = this.formBuilder.group({
      titulo: [this.publicacion.titulo, Validators.required],
      detalle: [this.publicacion.detalle, Validators.required],
      barrio: [this.casa.barrio, [Validators.required]],
      ciudad: [this.casa.ciudad, [Validators.required]],
      departamento: [this.casa.departamento, [Validators.required]],
      direccion: [this.casa.direccion, [Validators.required]],
      numeroDeBanos: [this.casa.numeroDeBanos, [Validators.required]],
      numeroDeCuartos: [this.casa.numeroDeCuartos, [Validators.required]],
      tipo: [this.casa.tipo, [Validators.required]]
    })
  }
  get control() {
    return this.formGroup.controls;
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
  mapearPublicacion() {

  }
  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.activeIndex = index
    });
  }
  cambiarIndex(i: number) {
    this.activeIndex = i;
    this.slides.slideTo(this.activeIndex);
  }
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

  elegirVariasImagenes() {
    var options: ImagePickerOptions = {
      maximumImagesCount: 5,
      quality: 60
    }
    this.imgPicker.getPictures(options).then((r) => {
      for (let i = 0; i < r.length; i++) {
        let fileName = r[i].substring(r[i]
          .lastIndexOf('/') + 1);
        let path = r[i].substring(0, r[i]
          .lastIndexOf('/') + 1);
        this.file.readAsDataURL(path, fileName).then((base64string) => {
          this.imagen = new Imagen();
          this.imagen.codigoImagen = randomInt(10).toString()
          this.imagen.idPublicacion = randomInt(10).toString();
          this.imagen.valor = base64string;
          this.imagenes.push(this.imagen)
        })
      }
    })
    console.log(this.imagenes);

  }
  onSubmit() {
    if (this.formGroup.invalid) {
      this.presentToast("Ingresa todos los datos para publicar tu casa!");
      return;
    }
    this.guardarPublicacion();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  guardarPublicacion() {
    this.casa = new Casa()
    this.publicacion = this.formGroup.value;
    this.casa.tipo = this.formGroup.value.tipo;
    this.casa.ciudad = this.ciudad;
    this.casa.departamento = this.departamento;
    this.casa.barrio = this.formGroup.value.barrio;
    this.casa.direccion = this.formGroup.value.direccion;
    this.casa.numeroDeBanos = this.formGroup.value.numeroDeBanos;
    this.casa.numeroDeCuartos = this.formGroup.value.numeroDeCuartos;
    this.casa.propietario = this.consultarUsuario();
    this.publicacion.imagenes = this.imagenes;
    this.publicacionService.save(this.publicacion).subscribe((p) =>
      this.publicacion = p
    );
    console.log(this.publicacion);

  }
}
