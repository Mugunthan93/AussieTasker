import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/Models/userData';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { UserDataState } from 'src/app/state/user.state';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;

  @ViewChild(IonModal) modal?: IonModal;
  passwordForm!: FormGroup;
  userData!: UserData;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private api: ApiService,
    private router:Router
  ) {
    this.passwordForm = this.fb.group({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

    this.userData$.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userData = res[0];
      }
    });
  }

  ngOnInit() {}

  changePassword() {
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.get('password')?.value ==
        this.passwordForm.get('confirmPassword')?.value
      ) {

        let req = {
          emailId:sessionStorage.getItem('emailId') || this.userData.emailId,
          password: this.passwordForm.get('password')?.value.trim(),
        };
        this.common.setLoading(true);
        this.api.forgotPasswordUpdate(req).subscribe({
          next: (res: any) => {
            this.common.setLoading(false);
            if (res.statusCode == 200) {
              this.modal?.present();
            }else {
              this.common.setLoading(false);
            }
          },
          error: (err) => {
            alert(JSON.stringify(err));
            this.common.setLoading(false);
          },
        });
      } else {
        this.common.openToast({
          msg: 'Both Fields Should Be Same',
          type: 'success',
        });
      }
    } else {
      this.common.openToast({
        msg: 'Please Enter New Password',
        type: 'success',
      });
    }
  }

  async logIn() {
    await this.modal?.dismiss();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
