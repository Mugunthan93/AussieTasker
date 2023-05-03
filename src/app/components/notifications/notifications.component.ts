import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  segment = 'all';
  isWeb = false;

  constructor(
    private modalCtrl: ModalController,
    private common: CommonService
  ) {
    this.common.getisWeb.subscribe({
      next: (res) => {
        if (res < 992) {
          this.isWeb = false;
        } else {
          this.isWeb = true;
        }
      },
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  changeSegment(e: any) {
    this.segment = e.target.value;
  }
}
