import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { IonicModule } from '@ionic/angular';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, IonicModule, NgxDropzoneModule],
  exports: [DialogComponent, NgxDropzoneModule],
})
export class SharedModule {}
