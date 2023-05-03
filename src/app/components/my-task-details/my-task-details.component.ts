import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AcceptOfferComponent } from '../accept-offer/accept-offer.component';

@Component({
  selector: 'app-my-task-details',
  templateUrl: './my-task-details.component.html',
  styleUrls: ['./my-task-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyTaskDetailsComponent implements OnInit {
  segment = 'offers';
  constructor(private modalCtrl: ModalController, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  changeSegment(e: any) {
    this.segment = e.target.value;
  }

  async onAccept() {
    const modal = await this.modalCtrl.create({
      component: AcceptOfferComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == 'confirm') {
      this.modalCtrl.dismiss(null, 'confirm');
    }
  }
}
