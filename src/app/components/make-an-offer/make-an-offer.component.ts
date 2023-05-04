import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { Select } from '@ngxs/store';
import { UserDataState } from 'src/app/state/user.state';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-make-an-offer',
  templateUrl: './make-an-offer.component.html',
  styleUrls: ['./make-an-offer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MakeAnOfferComponent implements OnInit {
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  userData: any;

  handShakeIcon = faHandshake;
  amount: any;
  discription: any;
  task: any;
  constructor(
    private modalCtrl: ModalController,
    private common: CommonService,
    private api: ApiService
  ) {
    this.userData$.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userData = res[0];
      }
    });

    this.common.selectedTask.asObservable().subscribe({
      next: (res: any) => {
        this.task = res;
      },
      error: () => {},
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  submit() {
    if (!this.discription) {
      this.common.openToast({ msg: 'Enter Discription', type: 'error' });
      return;
    }

    if (!this.amount) {
      this.common.openToast({ msg: 'Enter Amount', type: 'error' });
      return;
    }
    if (this.discription && this.amount) {
      let req = {
        task_id: this.task.taskId,
        proposer_id: this.userData._id,
        bid_amount: this.task.budget,
        cover_letter: 'coverletter',
        negotiated_amount: this.amount,
        response_remarks: this.discription,
      };
      this.common.setLoading(true);
      this.api.makeOffer(req).subscribe({
        next: (res) => {
          this.modalCtrl.dismiss(
            { disc: this.discription, amount: this.amount },
            'confirm'
          );
          this.common.setLoading(false);
        },
        error: (err) => {
          this.common.setLoading(false);
          this.common.openToast({ msg: err.error.message, type: 'error' });
        },
      });
    }
  }
}
