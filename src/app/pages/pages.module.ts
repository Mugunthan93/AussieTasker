import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { TabsPage } from '../tabs/tabs.page';
import { SharedComponentsModule } from '../components/component.module';
import {
  NgbDatepickerModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagesPageRoutingModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    SharedComponentsModule,
    NgbRatingModule,
    SwiperModule,
  ],
  declarations: [PagesPage, TabsPage],
  bootstrap: [PagesPage],
  providers: [Geolocation],
})
export class PagesPageModule {}
