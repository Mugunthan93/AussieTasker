import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetPasswordType, SetUserData } from 'src/app/actions/user.action';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private common: CommonService,
    private apiService: ApiService,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  async logIn() {
    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();
    if (this.loginForm.valid) {
      this.common.setLoading(true);
      this.common.closeToast();
      await this.apiService.onUserLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.common.setLoading(false);
          if (res.statusCode == 200) {
            this.store.dispatch(new SetUserData(res.data)).subscribe(() => {
              this.router.navigate(['/home']);
            });
          } else {
            this.common.openToast({ msg: res.message, type: 'error' });
          }
        },
        error: (err) => {
          alert(JSON.stringify(err));
          this.common.setLoading(false);
        },
      });
    }
  }

  forgotPass() {
    if (this.loginForm.get('emailId')?.valid) {
      this.store
        .dispatch(new SetPasswordType('Forgot Password'))
        .subscribe(() => {});
      let req = {
        type: 'Forgot Password',
        emailId: this.loginForm.get('emailId')?.value,
      };
      this.common.setLoading(true);
      this.apiService.onSendOTP(req).subscribe({
        next: (res: any) => {
          this.common.setLoading(false);
          if (res.statusCode == 200) {
            sessionStorage.setItem(
              'emailId',
              this.loginForm.get('emailId')?.value
            );
            this.router.navigate(['/verify']);
          } else {
            this.common.openToast({
              msg: res.message,
              type: 'error',
            });
          }
        },
        error: (err) => {
          this.common.setLoading(false);
        },
      });
    } else {
      this.common.openToast({ msg: 'Enter Email address', type: 'error' });
    }
  }
}
