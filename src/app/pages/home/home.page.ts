import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import {
  faScrewdriverWrench,
  faCarSide,
  faBroom,
  faHandsWash,
} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { TaskerRegisterComponent } from 'src/app/components/tasker-register/tasker-register.component';
import { UserDataState } from 'src/app/state/user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) successModal?: IonModal;
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  repairIcon = faScrewdriverWrench;
  carIcon = faCarSide;
  cleanIcon = faBroom;
  acIcon = faHandsWash;
  isWeb!: boolean;
  categories: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private common: CommonService,
    private api: ApiService
  ) {
    window.scroll(0, 0);

    this.common.getisWeb.subscribe((res) => {
      if (res < 992) {
        this.isWeb = false;
      } else {
        this.isWeb = true;
      }
    });

    this.api.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {}

  async openCreateTask(isNew?: any) {
    if (isNew) {
      const modal = await this.modalCtrl.create({
        component: TaskerRegisterComponent,
      });
      modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: CreateTaskComponent,
      });

      modal.cssClass = 'createTask';
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (role == 'confirm') {
        data?.present();
      }
    }
  }

  openBrowseTask(cate: any) {
    sessionStorage.setItem('ActiveTab', 'browse');
    let catgId = 'All';
    if (typeof cate == 'undefined' || cate == '' || cate == 'All') {
      catgId = 'All';
      sessionStorage.setItem('ActiveCatg', 'All');
    } else {
      catgId = cate.masterId;
      sessionStorage.setItem('ActiveCatg', catgId);
    }

    if (this.isWeb) {
      this.router.navigate(['/browseTasks']);
    } else {
      this.router.navigate(['/browse']);
    }
  }
}
