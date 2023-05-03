import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu, ModalController } from '@ionic/angular';
import { AboutComponent } from '../about/about.component';
import { FaqComponent } from '../faq/faq.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ProfileComponent } from '../profile/profile.component';
import { Share } from '@capacitor/share';
import { PaymentHistoryComponent } from '../payment-history/payment-history.component';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { DeleteUserData, SetUserData } from 'src/app/actions/user.action';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isWeb = false;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private store: Store,
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

  @ViewChild('menu') menu!: IonMenu;
  ngOnInit() {}

  async openProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
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

  async openAbout() {
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: AboutComponent,
      });
      modal.present();
    } else {
      this.router.navigate(['/settings/about']);
    }
  }

  async openFAQ() {
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: FaqComponent,
      });
      modal.present();
    } else {
      this.router.navigate(['/settings/faq']);
    }
  }

  openSocial() {
    Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  async openPaymentHistory() {
    if (!this.isWeb) {
      const modal = await this.modalCtrl.create({
        component: PaymentHistoryComponent,
      });
      modal.present();
    } else {
      this.router.navigate(['/settings/payment-history']);
    }
  }

  logOut() {
    this.store.dispatch(new DeleteUserData()).subscribe(() => {
      this.router.navigate(['/login']);
    });

    // this.common.toggleSideMenu.next(false);
    this.menu.close();
  }
}
