import {ModalController} from '@ionic/angular';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-header-back-button',
  templateUrl: './header-back-button.component.html',
  styleUrls: ['./header-back-button.component.scss'],
})
export class HeaderBackButtonComponent implements OnInit {
  @Input() titulo: string;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

}
