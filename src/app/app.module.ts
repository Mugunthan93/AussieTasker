import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { UserDataState } from './state/user.state';
import { PasswordState } from './state/passwordType.state';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    NgxsModule.forRoot([UserDataState, PasswordState]),
    HttpClientModule,
    NgxsStoragePluginModule.forRoot({
      key: UserDataState,
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient,
    HTTP,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
