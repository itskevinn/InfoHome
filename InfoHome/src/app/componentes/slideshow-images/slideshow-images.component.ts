import { Imagen } from './../../interfaces/imagen';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow-images',
  templateUrl: './slideshow-images.component.html',
  styleUrls: ['./slideshow-images.component.scss'],
})
export class SlideshowImagesComponent implements OnInit {
  @Input() imagenes: Imagen[]
  constructor() { }

  ngOnInit() { }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    freeMode: false,
  };
}
