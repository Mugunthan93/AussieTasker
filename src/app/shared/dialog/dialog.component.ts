import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;
  @Input() data: any;
  constructor() {}

  ngOnInit() {}
}
