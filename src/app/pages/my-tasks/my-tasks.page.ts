import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { MyTaskDetailsComponent } from 'src/app/components/my-task-details/my-task-details.component';
import { TaskDetailsComponent } from 'src/app/components/task-details/task-details.component';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { tabDataState } from 'src/app/state/tab.state';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit, AfterViewInit {
  @ViewChild(IonModal) successModal?: IonModal;
  @Select(tabDataState.getCurrentTabData) tabName$!: BehaviorSubject<string>;
  tasksList: any = [];
  isAll = true;
  isBooking = false;
  isAssigned = false;
  isOffer = false;
  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private common: CommonService
  ) {
    this.common.tabData.asObservable().subscribe({
      next: (e: any) => {
        if (e && e.tab == 'myTasks') {
          this.getMyTasks();
        }
      },
      error: (err) => {},
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  getMyTasks() {
    this.common.setLoading(true);
    this.api.getAllMyTasks().subscribe({
      next: (e: any) => {
        this.common.setLoading(false);
        if (e.data) {
          this.tasksList = e.data;
        }
      },
      error: (err) => {
        this.common.setLoading(false);
      },
    });
  }

  async openDetails(task: any) {
    this.common.selectedTask.next(task);
    const modal = await this.modalCtrl.create({
      component: MyTaskDetailsComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.successModal?.present();
    }
  }

  cancelSuccess(e: any) {
    return this.modalCtrl?.dismiss(null, 'cancel');
  }

  onFilter(type: any) {
    switch (type) {
      case 'All':
        this.isAll = true;
        this.isAssigned = false;
        this.isBooking = false;
        this.isOffer = false;
        break;
      case 'Booking':
        this.isAll = false;
        this.isBooking = !this.isBooking;
        break;
      case 'Assigned':
        this.isAll = false;
        this.isAssigned = !this.isAssigned;
        break;
      case 'Offer':
        this.isAll = false;
        this.isOffer = !this.isOffer;
        break;
    }
  }

  async postTask() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
      this.successModal?.present();
    }
  }
}
