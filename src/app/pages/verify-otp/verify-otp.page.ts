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
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { PasswordState } from 'src/app/state/passwordType.state';
import { UserDataState } from 'src/app/state/user.state';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyOTPPage implements OnInit, OnDestroy {
  @Select(UserDataState.getUserData) getUserData$!: Observable<UserData>;
  @Select(PasswordState.getPasswordType) passType$!: Observable<string>;

  @ViewChild(IonModal) modal?: IonModal;
  userData!: UserData;
  otpValue: string = '';
  otpForm!: FormGroup;
  passType: string = '';

  constructor(
    private router: Router,
    private common: CommonService,
    private apiSevice: ApiService,
    private store: Store,
    private fb: FormBuilder
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

    this.passType$.subscribe((res: any) => {
      console.log(res);
      this.passType = res;
    });
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      input_1: new FormControl(''),
      input_2: new FormControl(''),
      input_3: new FormControl(''),
      input_4: new FormControl(''),
      input_5: new FormControl(''),
      input_6: new FormControl(''),
    });
  }

  async onInputChange(e: any, ele: HTMLInputElement, prev?: any, nxt?: any) {
    if (prev && e.key == 'Backspace') {
      ele.value = '';
      prev.focus();
      // return;
    } else if (ele.value != '0' && !Number(ele.value.trim())) {
      ele.value = ' ';
      // return;
    } else {
      if (ele.value.length > 1) {
        ele.value = e.key;
      }
      if (nxt) {
        nxt.focus();
      } else {
        // return;
      }
    }
    this.otpForm.get(ele.id)?.patchValue(ele.value);
  }

  async submitOTP() {
    this.otpValue = '';
    Object.values(this.otpForm.value).forEach((val) => {
      this.otpValue = this.otpValue + val;
    });

    if (this.otpValue) {
      let req = {
        type: this.passType,
        emailId: sessionStorage.getItem('emailId'),
        otp: Number(this.otpValue),
      };
      this.common.setLoading(true);

      await this.apiSevice.onVerifyOtp(req).subscribe({
        next: (res: any) => {
          this.common.setLoading(false);
          this.otpForm.reset();
          if (res.statusCode == 200) {
            if (this.passType == 'Account Creation') {
              this.modal?.present();
            } else {
              this.router.navigate(['/changePassword']);
            }
          } else {
            this.common.openToast({ msg: res.message, type: 'error' });
          }
        },
        error: (err) => {
          alert(JSON.stringify(err))
          this.common.setLoading(false);
        },
      });
    } else {
      this.common.openToast({ msg: 'Please Enter Valid OTP', type: 'error' });
    }
  }

  async logIn() {
    await this.modal?.dismiss();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  async ngOnDestroy() {
    // await this.toastController.dismiss();
  }
}
