import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentHistoryComponent implements OnInit {
  segment = 'tasker';
  earned = 250;
  spent = 0;
  spentDetails: any = [];
  earedDetails: any = [
    {
      id: 'AT-22-1101',
      amount: 10,
      date: new Date(),
      status: 'Pending',
    },
    {
      id: 'AT-22-1101',
      amount: 10,
      date: new Date(),
      status: 'Pending',
    },
    {
      id: 'AT-22-1101',
      amount: 10,
      date: new Date(),
      status: 'Pending',
    },
    {
      id: 'AT-22-1101',
      amount: 10,
      date: new Date(),
      status: 'Pending',
    },
  ];
  constructor(private modalCtrl: ModalController) {}

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
