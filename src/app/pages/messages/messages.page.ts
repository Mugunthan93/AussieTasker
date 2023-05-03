import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openChat() {
    const modal = await this.modalCtrl.create({
      component: ChatComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
}
