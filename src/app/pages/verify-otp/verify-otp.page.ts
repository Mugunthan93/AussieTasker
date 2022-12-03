import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyOTPPage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;

  constructor(private render: Renderer2, private router: Router) {
    router.events.forEach((event) => {
      if (event) {
        let ele = document.getElementById('input_1');
        if (ele) ele.focus();
      }
    });
  }

  ngOnInit() {}

  async onInputChange(e: any, ele: HTMLInputElement, prev?: any, nxt?: any) {
    if (prev && e.key == 'Backspace') {
      ele.value = '';
      prev.focus();
      return;
    } else if (!Number(ele.value.trim())) {
      ele.value = ' ';
      return;
    } else {
      if (ele.value.length > 1) {
        ele.value = ele.value.substring(ele.value.length - 1);
      }
      if (nxt) {
        nxt.focus();
      } else {
        return;
      }
    }
  }

  async submitOTP() {
    await this.modal?.present();
  }

  async logIn() {
    await this.modal?.dismiss();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}
