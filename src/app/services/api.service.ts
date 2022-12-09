import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private https: HttpClient) {
  }


  onCreateUser(req: any) {
    return this.https.post(environment.BASE_URL + 'createUser', req);
  }

  onSendOTP(req: any) {
    return this.https.post(environment.BASE_URL + 'sendOtp', req);
  }
  onVerifyOtp(req: any) {
    return this.https.post(environment.BASE_URL + 'verifyOtp', req);
  }

  onUserLogin(req: any) {
    return this.https.post(environment.BASE_URL + 'userLogin', req);
  }

  forgotPasswordUpdate(req: any) {
    return this.https.post(environment.BASE_URL + 'forgotPasswordUpdate', req);
  }

  getCountries(){
    return this.https.get('https://restcountries.com/v2/all');
  }
}
