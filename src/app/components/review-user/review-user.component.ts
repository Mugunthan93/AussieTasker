import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-user',
  templateUrl: './review-user.component.html',
  styleUrls: ['./review-user.component.scss'],
})
export class ReviewUserComponent implements OnInit {
  reviewIcon = faFeather;
  reviewsList = [
    {
      title: 'WordPress has been Redirected to another website',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eligendi qui quaerat, nesciunt, fuga sunt laudantium iste illo maxime asperiores! Dolore necessitatibus repellendus aliquid.',
      name: 'Ales S',
      created: '9/26/2016',
    },
    {
      title: 'WordPress has been Redirected to another website',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eligendi qui quaerat, nesciunt, fuga sunt laudantium iste illo maxime asperiores! Dolore necessitatibus repellendus aliquid.',
      name: 'Ales S',
      created: '9/26/2016',
    },
  ];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
