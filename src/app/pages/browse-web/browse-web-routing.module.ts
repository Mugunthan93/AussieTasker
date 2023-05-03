import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseWebPage } from './browse-web.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseWebPageRoutingModule {}
