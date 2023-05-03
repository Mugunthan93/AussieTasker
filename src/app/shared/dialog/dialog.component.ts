import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  @Input() data: any;
  @Output() onClose = new EventEmitter();
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.onClose.emit('cancel');
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
