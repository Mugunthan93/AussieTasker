import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @ViewChild(IonModal) modal?: IonModal;
  isWeb!: boolean;
  taskList: any;

  constructor(
    private modalCtrl: ModalController,
    private common: CommonService
  ) {
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

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.taskList = this.data;
    }
  }

  async filter() {
    await this.modal?.present();
  }

  async cancel() {
    await this.modal?.dismiss();
  }

  async Submit() {
    await this.modal?.dismiss();
  }

  async openDetails(task: any) {
    this.common.selectedTask.next(task);
    this.data.forEach((tsk) => {
      if (tsk.taskId === task.taskId) {
        tsk.isActive = true;
      } else {
        tsk.isActive = false;
      }
    });
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: TaskDetailsComponent,
        componentProps: {},
      });
      modal.present();
    }
  }

  change(e: any) {
    let value = e.target.value;
    this.taskList = this.data.filter((task) => task.status === value);
  }

  onInputChange(event: any) {
    let value = event.target.value;
    this.taskList = this.data.filter((task) =>
      task.taskTitle.toLowerCase().includes(value.toLowerCase())
    );
  }

  isSort = false;
  sorting() {
    this.isSort = !this.isSort;

    if (this.isSort) {
      this.taskList.sort((a: any, b: any) =>
        a.taskTitle < b.taskTitle ? -1 : 1
      );
    } else {
    }
    this.taskList.sort((a: any, b: any) =>
      a.taskTitle > b.taskTitle ? -1 : 1
    );
  }
}
