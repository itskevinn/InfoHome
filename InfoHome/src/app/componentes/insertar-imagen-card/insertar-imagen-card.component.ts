import { Component, OnInit } from '@angular/core';
import { ImagePickerOptions, ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx'

@Component({
  selector: 'app-insertar-imagen-card',
  templateUrl: './insertar-imagen-card.component.html',
  styleUrls: ['./insertar-imagen-card.component.scss'],
})
export class InsertarImagenCardComponent implements OnInit {

  constructor(private imgPicker: ImagePicker, private file: File) { }
  imagenes: any[]
  ngOnInit() { }
  elegirVariasImagenes() {
    var options: ImagePickerOptions = {
      maximumImagesCount: 5,
      width: 100,
      height: 100
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
  }
}
