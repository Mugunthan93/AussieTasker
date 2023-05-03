import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseWebPageRoutingModule } from './browse-web-routing.module';

import { BrowseWebPage } from './browse-web.page';
import { BrowsePageModule } from '../browse/browse.module';
import { SharedComponentsModule } from 'src/app/components/component.module';

@NgModule({
  declarations: [BrowseWebPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseWebPageRoutingModule,
    BrowsePageModule,
    SharedComponentsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrowseWebPageModule {}
