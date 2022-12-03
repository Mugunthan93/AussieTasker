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
import { SetUserData, SetUserDataAction } from 'src/app/actions/user.action';
import { UserData } from 'src/app/Models/userData';
import { CommonService } from 'src/app/services/common.service';
import { UserDataState } from 'src/app/state/user.state';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupPage implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  @Select(UserDataState.getUserData) userData!: Observable<UserData[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private common: CommonService,
    private store: Store,
    private loading: LoadingController
  ) {
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
        ),
      ]),
    });
  }

  ngOnInit() {}

  async onSignUp() {
    this.signUpForm.markAllAsTouched();
    this.signUpForm.markAsDirty();
    if (this.signUpForm.valid) {
      // this.router.navigate(['/verify']);
      this.common.setLoading(true);
      let obj = {
        emailId: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        loginType: 'Email',
      };
      await this.common.onCreateUser(obj).subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            let data: UserData = {
              _id: res.data._id,
              userId: res.data.userId,
              emailId: res.data.emailId,
              status: res.data.status,
              isEmailVerified: res.data.isEmailVerified,
              token: res.data.token,
              previousPassword: res.data.previousPassword,
            };
            this.store.dispatch(new SetUserData(data)).subscribe(() => {
              this.clearForm();
              this.router.navigate(['/verify']);
            });
          }
          this.common.setLoading(false);
        },
        error: (error: any) => {
          console.log(error);
          this.common.setLoading(false);
        },
      });
    } else if (this.signUpForm.get('email')?.errors) {
      console.log(this.signUpForm);
      this.presentToast('Enter Valid Email');
    } else {
      console.log(this.signUpForm);
      this.presentToast(
        'Password should be \n8 characters \nincludes of atleast \n1 Caps, \n1 Numeric, 1 Symbol'
      );
    }
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

  clearForm() {
    this.signUpForm.reset();
  }

  async ngOnDestroy() {
    await this.toastController.dismiss();
  }
}
