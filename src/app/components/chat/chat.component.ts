import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages = [
    {
      user: 'Vicky',
      text: 'Hi',
      time: new Date(),
    },
    {
      user: 'Arun',
      text: 'Hello',
      time: new Date(),
    },
    {
      user: 'Vicky',
      text: 'Hey Arun! VIcky here!! How are you? Its really great to meet you here. Where are you now?',
      time: new Date(),
    },
    {
      user: 'Arun',
      text: 'Shall we discuss in detail on google meet or Zoom?',
      time: new Date(),
    },
  ];

  currentUser = 'Vicky';
  chatUser = 'Arun';
  msgEntered = '';

  @ViewChild('chat') chat!: ElementRef;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  sendMsg() {
    if (this.msgEntered) {
      this.messages.push({
        user: this.currentUser,
        text: this.msgEntered,
        time: new Date(),
      });
      this.msgEntered = '';
      setTimeout(() => {
        this.chat.nativeElement?.scrollTo(
          0,
          this.chat.nativeElement.scrollHeight
        );
      }, 200);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
