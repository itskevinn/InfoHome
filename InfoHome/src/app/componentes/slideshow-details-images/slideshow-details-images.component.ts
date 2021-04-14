import { Imagen } from './../../interfaces/imagen';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow-details-images',
  templateUrl: './slideshow-details-images.component.html',
  styleUrls: ['./slideshow-details-images.component.scss'],
})
export class SlideshowDetailsImagesComponent implements OnInit {
  @Input() imagenes: Imagen[]
  constructor() { }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    freeMode: true,
  };
  ngOnInit() { }

}
