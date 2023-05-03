import {
  AfterContentInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { TaskDetailsComponent } from 'src/app/components/task-details/task-details.component';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BrowsePage implements OnInit, AfterContentInit {
  taskList: any = [];

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private common: CommonService
  ) {
    this.common.tabData.asObservable().subscribe({
      next: (e: any) => {
        if (e && e.tab == 'browse') {
          this.getAllTasks();
        }
      },
      error: (err) => {},
    });
  }

  ngOnInit() {}

  ngAfterContentInit(): void {}

  getAllTasks() {
    this.common.setLoading(true);
    this.api.getAllTasks().subscribe({
      next: (res: any) => {
        console.log(res);
        this.taskList = res.data;
        this.common.setLoading(false);
      },
      error: (err: any) => {
        console.log(err);
        this.common.openToast({ msg: err.error.message, type: 'error' });
        this.common.setLoading(false);
      },
    });
  }
}
