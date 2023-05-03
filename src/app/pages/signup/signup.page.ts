import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  SetPasswordType,
  SetUserData,
  SetUserDataAction,
} from 'src/app/actions/user.action';
import { UserData } from 'src/app/Models/userData';
import { CommonService } from 'src/app/services/common.service';
import { UserDataState } from 'src/app/state/user.state';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPage implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private common: CommonService,
    private apiSevice: ApiService,
    private store: Store
  ) {
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }

  ngOnInit() {}

  async onSignUp() {
    this.signUpForm.markAllAsTouched();
    this.signUpForm.markAsDirty();
    if (
      this.signUpForm.valid &&
      this.signUpForm.get('password')?.value ===
        this.signUpForm.get('confirmPassword')?.value
    ) {
      this.common.setLoading(true);
      this.common.closeToast();
      let obj = {
        emailId: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        loginType: 'Email',
      };

      this.apiSevice.onCreateUser(obj).subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.common.setLoading(false);
            let data: any = {};

            Object.keys(res.data).forEach((key: any) => {
              if (key !== 'password') {
                data[key] = res.data[key];
              }
            });
            this.store.dispatch(new SetUserData(res.data)).subscribe(() => {
              this.clearForm();
              this.userData = res.data;
              sessionStorage.setItem('emailId', res.data.emailId);
              sessionStorage.setItem(
                'userDetails',
                JSON.stringify(this.userData)
              );
              this.sendOTP(res.data.emailId);
            });
          } else {
            this.common.setLoading(false);
            this.common.openToast({ msg: res.message, type: 'error' });
          }
        },
        error: (err: any) => {
          this.common.setLoading(false);
          alert(JSON.stringify(err));
          console.log(err);
          this.common.setLoading(false);
        },
      });
    } else if (
      this.signUpForm.get('password')?.value !==
      this.signUpForm.get('confirmPassword')?.value
    ) {
      this.common.openToast({
        msg: 'Password & Confirm password should be same',
        type: 'error',
      });
    } else if (this.signUpForm.get('email')?.errors) {
      console.log(this.signUpForm);
      this.common.openToast({ msg: 'Enter Valid Email', type: 'error' });
    } else {
      console.log(this.signUpForm);

      this.common.openToast({ msg: 'Enter strong password', type: 'error' });
    }
  }

  clearForm() {
    this.signUpForm.reset();
  }

  sendOTP(email: any) {
    this.common.closeToast();
    this.common.setLoading(true);

    this.store
      .dispatch(new SetPasswordType('Account Creation'))
      .subscribe(() => {
        // this.clearForm();
      });

    let req = {
      type: 'Account Creation',
      emailId: email,
    };

    this.apiSevice.onSendOTP(req).subscribe({
      next: (res: any) => {
        this.common.setLoading(false);
        if (res.statusCode == 200) {
          this.router.navigate(['/verify']);
        } else {
          this.common.openToast({ msg: res.message, type: 'error' });
        }
      },
      error: (err) => {
        alert(JSON.stringify(err));
      },
    });
  }

  async ngOnDestroy() {
    // await this.toastController.dismiss();
  }
}
