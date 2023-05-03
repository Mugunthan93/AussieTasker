import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonModal, ModalController, NavParams } from '@ionic/angular';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { AboutComponent } from '../about/about.component';
import { MakeAnOfferComponent } from '../make-an-offer/make-an-offer.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDetailsComponent implements OnInit {
  segment = 'details';
  @ViewChild(IonModal) successModal?: IonModal;
  isWeb!: boolean;
  task: any;
  currentUser: any;
  isLess = true;
  value = this.navParams.get('value');

  constructor(
    private modalCtrl: ModalController,
    config: NgbRatingConfig,
    private common: CommonService,
    private api: ApiService,
    private navParams: NavParams
  ) {
    config.max = 5;
    config.readonly = true;
    this.common.getisWeb.subscribe({
      next: (res) => {
        if (res < 992) {
          this.isWeb = false;
        } else {
          this.isWeb = true;
        }
      },
    });

    this.common.selectedTask.asObservable().subscribe({
      next: (res: any) => {
        this.task = res;
        if (this.task.userId) {
          this.getUserData(this.task.userId);
        }
      },
      error: () => {},
    });
  }

  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  changeSegment(e: any) {
    this.segment = e.target.value;
  }

  async openOffer() {
    const modal = await this.modalCtrl.create({
      component: MakeAnOfferComponent,
    });
    modal.cssClass = 'offer';
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      this.successModal?.present();
    }
  }

  cancelSuccess(e: any) {
    return this.modalCtrl?.dismiss(null, 'cancel');
  }

  getUserData(userId: any) {
    // this.common.setLoading(true);
    this.api.findParticularUserProfile(userId).subscribe({
      next: (res: any) => {
        this.currentUser = res.data;
        this.common.setLoading(false);
      },
      error: () => {
        this.common.setLoading(false);
      },
    });
  }
}
