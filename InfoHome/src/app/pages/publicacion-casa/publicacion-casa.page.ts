import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Publicacion } from './../../interfaces/publicacion';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-publicacion-casa',
  templateUrl: './publicacion-casa.page.html',
  styleUrls: ['./publicacion-casa.page.scss'],
})
export class PublicacionCasaPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  publicacion: Publicacion
  activeIndex: number = 0
  imagen: string
  constructor(private imgPicker: ImagePicker, private file: File) { }
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
  imagenes: any[] = []
  ngOnInit() { }
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
          this.imagenes.push(base64string);
        })
      }
    })
    console.log(this.imagenes);

  }
  guardarPublicacion() {

  }
}
