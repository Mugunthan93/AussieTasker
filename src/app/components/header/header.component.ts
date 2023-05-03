import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  Event as NavigationEvent,
  NavigationEnd,
} from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUrl = '';
  isWeb!: boolean;

  @ViewChild(IonModal) successModal?: IonModal;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.common.screenSize.next(window.innerWidth);
    if (window.innerWidth < 992) {
      this.isWeb = false;
    } else {
      this.isWeb = true;
    }
  }
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private common: CommonService
  ) {
    this.router.events.subscribe((data: NavigationEvent) => {
      if (data instanceof NavigationEnd) {
        console.log(data);
        this.currentUrl = data.url;
      }
    });

    this.currentUrl = this.router.url;
    this.common.screenSize.next(window.innerWidth);
    if (window.innerWidth < 992) {
      this.isWeb = false;
    } else {
      this.isWeb = true;
    }
  }

  ngOnInit() {}

  async openProfile() {
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: ProfileComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
      }
    } else {
      this.router.navigate(['/profile']);
    }
  }

  async openNotification() {
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: NotificationsComponent,
      });
      modal.present();
    } else {
      this.router.navigate(['/settings/notification']);
    }
  }

  async createTask() {
    if (this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: CreateTaskComponent,
      });
      modal.cssClass = 'createTask';
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (role == 'confirm') {
        // this.successModal?.cssClass = 'success'
        this.successModal?.present();
      }
    }
  }
}
