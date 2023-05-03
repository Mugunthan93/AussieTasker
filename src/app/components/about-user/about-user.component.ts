import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutUserComponent implements OnInit {
  isWeb!: boolean;
  isEdit = false;
  about =
    "Aussie tasker is a trusted community platform that connects people who need to outsource tasks and find local services, with people who are looking to earn money and ready to work. From simple to complicated tasks, Airtasker can help you complete your home cleaning, handyman jobs, admin work, photography, graphic design or even build a website. Go online or download the app and Aussie tasker will take you from 'things to do' to 'everything's done'.";

  constructor(
    private modalCtrl: ModalController,
    private common: CommonService
  ) {
    this.common.getisWeb.subscribe((res) => {
      if (res < 992) {
        this.isWeb = false;
      } else {
        this.isWeb = true;
      }
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  editContent() {
    this.isEdit = !this.isEdit;
  }
}
