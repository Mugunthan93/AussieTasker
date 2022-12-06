import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { TabsPage } from '../tabs/tabs.page';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PagesPage, TabsPage, HomeComponent],
  bootstrap: [PagesPage],
})
export class PagesPageModule {}
