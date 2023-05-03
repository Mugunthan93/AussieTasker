import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyOTPPageRoutingModule } from './verify-otp-routing.module';

import { VerifyOTPPage } from './verify-otp.page';
import { SharedComponentsModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyOTPPageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  declarations: [VerifyOTPPage],
})
export class VerifyOTPPageModule {}
