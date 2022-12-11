import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';
import { TabsPage } from '../tabs/tabs.page';
import { HeaderComponent } from '../components/header/header.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PagesPage, TabsPage, HeaderComponent, SideMenuComponent],
  bootstrap: [PagesPage],
})
export class PagesPageModule {}
