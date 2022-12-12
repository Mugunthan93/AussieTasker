import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { TabsPage } from '../tabs/tabs.page';
import { SharedComponentsModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [PagesPage, TabsPage],
  bootstrap: [PagesPage],
})
export class PagesPageModule {}
