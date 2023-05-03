import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tasker-register',
  templateUrl: './tasker-register.component.html',
  styleUrls: ['./tasker-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskerRegisterComponent implements OnInit {
  isEdit = false;
  formName = '';
  formAccount!: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.formAccount = this.fb.group({
      name: new FormControl(''),
      number: new FormControl(''),
      bsb: new FormControl(''),
    });
  }

  ngOnInit() {}

  cancel(type: any, data?: any) {
    if ('cancel') {
      this.modalCtrl?.dismiss(data, type);
    } else if ('edit') {
      this.isEdit = false;
    }
  }

  uploadPicture() {
    this.formName = 'upload';
    this.isEdit = true;
  }

  accountInfo() {
    this.formName = 'account';
    this.isEdit = true;
  }

  onSubmit() {
    this.isEdit = false;
  }
}
