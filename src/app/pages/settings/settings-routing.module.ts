import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from 'src/app/components/about/about.component';
import { FaqComponent } from 'src/app/components/faq/faq.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { PaymentHistoryComponent } from 'src/app/components/payment-history/payment-history.component';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'notification',
        component: NotificationsComponent,
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
