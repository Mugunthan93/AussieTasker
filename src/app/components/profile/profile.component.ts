import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AboutUserComponent } from '../about-user/about-user.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReviewUserComponent } from '../review-user/review-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  segment = 'tasker';
  profileSegment = 'about';
  isWeb!: boolean;
  isEditName = false;
  isEditAddress = false;
  name = 'Lidia WilSon';
  address = 'H.No 44A, Sector 8A, Mile End, South Australia, Australia';

  constructor(
    private modalCtrl: ModalController,
    private rating: NgbRatingConfig,
    private common: CommonService
  ) {
    this.rating.max = 5;
    this.rating.readonly = true;

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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(data: any) {
    return this.modalCtrl.dismiss(data, 'confirm');
  }

  ngOnInit() {}

  async openAboutUser() {
    const modal = await this.modalCtrl.create({
      component: AboutUserComponent,
    });
    modal.present();
  }

  async openMySkills() {
    const modal = await this.modalCtrl.create({
      component: MySkillsComponent,
    });
    modal.present();
  }

  async openPortFolio() {
    const modal = await this.modalCtrl.create({
      component: PortfolioComponent,
    });
    modal.present();
  }

  async openReview() {
    const modal = await this.modalCtrl.create({
      component: ReviewUserComponent,
    });
    modal.present();
  }

  onChangeSegment(e: any) {
    this.segment = e.detail.value;
  }

  onChangeProfileSegment(e: any) {
    this.profileSegment = e.detail.value;
  }

  onEdit(type: any) {
    if (type === 'name') {
      this.isEditName = true;
    } else if (type === 'address') {
      this.isEditAddress = true;
    }
  }

  onSave(type: any) {
    if (type === 'name') {
      this.isEditName = false;
    } else if (type === 'address') {
      this.isEditAddress = false;
    }
  }
}
