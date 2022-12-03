import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, IonicModule],
  exports: [DialogComponent],
})
export class SharedModule {}
