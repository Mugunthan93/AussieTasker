import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnInit {
  loading: any;

  constructor(
    private http: HttpClient,
    private loadingControl: LoadingController,
    private store: Store,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  async setLoading(isLoading: boolean) {
    if (isLoading) {
      const load = await this.loadingControl.create({
        message: 'Please Wait...',
        cssClass: 'custom-loading',
      });
      load.present();
    } else {
      this.loadingControl.getTop().then((data) => {
        if (data) {
          this.loadingControl.dismiss();
        }
      });
    }
  }

  async openToast(req: any) {
    const toast = await this.toastController.create({
      message: req.msg,
      duration: 10000,
      cssClass: req.type == 'success' ? 'success-toast' : 'danger-toast',
      buttons: [
        {
          icon: req.type == 'success' ? 'close-circle' : 'checkmark-circle',
          role: 'cancel',
          side: 'end',
          cssClass: 'toast-icon',
        },
      ],
    });
    await toast.present();
  }

  async closeToast() {
    await this.toastController.getTop().then((data) => {
      if (data) {
        this.toastController.dismiss();
      }
    });
  }
}
