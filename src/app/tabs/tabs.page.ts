import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonModal, IonTabs, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { SetTabData } from '../actions/tab.action';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsPage {
  @ViewChild(IonModal) successModal?: IonModal;
  @ViewChild('navTabs', { static: false }) navTabs!: IonTabs;
  menuFlag = false;
  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private common: CommonService
  ) {
    if (window.innerWidth < 992) {
      this.menuFlag = true;
    } else {
      this.menuFlag = false;
    }
  }

  async openCreateTask() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
      this.successModal?.present();
    }
  }

  onTabChange(e: any) {
    this.store.dispatch(new SetTabData(e.tab));
    this.common.tabData.next(e);
  }

  cancel() {
    return this.successModal?.dismiss();
  }
}
