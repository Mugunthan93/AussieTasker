import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTasksPageRoutingModule } from './my-tasks-routing.module';

import { MyTasksPage } from './my-tasks.page';
import { SharedComponentsModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTasksPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [MyTasksPage],
})
export class MyTasksPageModule {}
