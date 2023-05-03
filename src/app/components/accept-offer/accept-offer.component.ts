import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-accept-offer',
  templateUrl: './accept-offer.component.html',
  styleUrls: ['./accept-offer.component.scss'],
})
export class AcceptOfferComponent implements OnInit {
  task: any;
  constructor(
    private modalCtrl: ModalController,
    private common: CommonService,
    private api: ApiService
  ) {
    this.common.selectedTask.asObservable().subscribe({
      next: (res: any) => {
        this.task = res;
      },
      error: () => {},
    });
  }

  ngOnInit() {}

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    let req = {
      task_id: this.task.taskId,
      proposer_id: this.task.proposer_id,
      bid_amount: this.task.bid_amount,
      cover_letter: this.task.cover_letter,
      negotiated_amount: this.task.negotiated_amount,
      response_remarks: this.task.response_remarks,
      task_OfferId: '29dff413-99bc-4255-b558-1a8a9cb46282',
      status: 'Active',
      response_status: 'approved',
    };
    this.common.setLoading(true);
    this.api.updateOffer(req).subscribe({
      next: (res: any) => {
        this.common.setLoading(false);
        return this.modalCtrl.dismiss(null, 'confirm');
      },
      error: (err: any) => {
        this.common.setLoading(false);
        this.common.openToast({ msg: err.error.message, type: 'error' });
      },
    });
  }
}
