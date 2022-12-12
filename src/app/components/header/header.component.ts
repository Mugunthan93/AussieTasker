import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  async openProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }

}
