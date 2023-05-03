import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  imgList = new Array();
  constructor(private modalCtrl: ModalController) {
    // this.imgList.forEach((e, i) => {
    //   e = 'https://picsum.photos/id/' + (i + 300) + '/200/200';
    // });

    for (let i = 0; i < 31; i++) {
      this.imgList.push('https://picsum.photos/id/' + (i + 300) + '/100/100');
    }
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
