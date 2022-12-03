import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetLoading, SetLoading } from '../actions/loader.action';
import { LoaderState } from '../state/loader.state';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnInit {
  loading: any;
  @Select(LoaderState.getLoader) isLoading!: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private loadingControl: LoadingController,
    private store: Store
  ) {
    this.store.dispatch(new GetLoading());
    this.isLoading.subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new SetLoading(false));
    this.isLoading.subscribe((res) => {
      console.log(res);
    });
  }

  onCreateUser(req: any) {
    return this.http.post(environment.BASE_URL + 'createUser', req);
  }

  async setLoading(isLoading: boolean) {
    this.store.dispatch(new SetLoading(isLoading)).subscribe(() => {});

    this.store.dispatch(new GetLoading());
    this.isLoading.subscribe((res) => {
      console.log(res);
      this.onLoad(res);
    });
  }

  async onLoad(flag: boolean) {
    if (flag) {
      const load = await this.loadingControl.create({
        message: 'Please Wait...',
        cssClass: 'custom-loading',
      });
      load.present();
    } else {
      this.loadingControl.dismiss();
    }
  }
}
