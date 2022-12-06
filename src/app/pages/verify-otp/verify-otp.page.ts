import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { CommonService } from 'src/app/services/common.service';
import { UserDataState } from 'src/app/state/user.state';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyOTPPage implements OnInit, OnDestroy {
  @Select(UserDataState.getUserData) getUserData$!: Observable<UserData>;
  @ViewChild(IonModal) modal?: IonModal;
  userData!: UserData;
  otpValue: string = '';

  constructor(
    private router: Router,
    private common: CommonService,
    private toastController: ToastController
  ) {
    router.events.forEach((event) => {
      if (event) {
        let ele = document.getElementById('input_1');
        if (ele) ele.focus();
      }
    });

    this.getUserData$.subscribe((res: any) => {
      this.userData = res[0];
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
      this.otpValue = this.otpValue + '' + ele.value;
      if (nxt) {
        nxt.focus();
      } else {
        return;
      }
    }
  }

  async submitOTP() {
    console.log(this.otpValue);
    if (this.otpValue) {
      let req = {
        type: 'Account Creation',
        emailId: this.userData.emailId,
        otp: Number(this.otpValue),
      };
      this.common.onLoad(true);
      await this.common.onVerifyOtp(req).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.modal?.present();
        }
        this.modal?.present();
        this.common.onLoad(false);
      });
    } else {
      this.presentToast('Please Enter Valid OTP');
    }
  }

  async logIn() {
    await this.modal?.dismiss();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }

  async ngOnDestroy() {
    await this.toastController.dismiss();
  }
}
