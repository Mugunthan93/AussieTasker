import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'browse',
        loadChildren: () =>
          import('./browse/browse.module').then((m) => m.BrowsePageModule),
      },
      {
        path: 'myTasks',
        loadChildren: () =>
          import('./my-tasks/my-tasks.module').then((m) => m.MyTasksPageModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then(
            (m) => m.MessagesPageModule
          ),
      },
      {
        path: '**',
        redirectTo: 'signup',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'startup',
    loadChildren: () =>
      import('./startup/startup.module').then((m) => m.StartupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./verify-otp/verify-otp.module').then(
        (m) => m.VerifyOTPPageModule
      ),
  },
  {
    path: 'changePassword',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
  {
    path: 'userDetails',
    loadChildren: () =>
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
