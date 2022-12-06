import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from '../components/categories/categories.component';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SearchComponent } from '../components/search/search.component';
import { LoginPage } from './login/login.page';

import { PagesPage } from './pages.page';
import { SignupPage } from './signup/signup.page';
import { StartupPage } from './startup/startup.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category',
        component: CategoriesComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'startup',
        loadChildren: () =>
          import('../pages/startup/startup.module').then(
            (m) => m.StartupPageModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('../pages/signup/signup.module').then(
            (m) => m.SignupPageModule
          ),
      },
      {
        path: 'verify',
        loadChildren: () =>
          import('../pages/verify-otp/verify-otp.module').then(
            (m) => m.VerifyOTPPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
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
    path: 'verify-otp',
    loadChildren: () =>
      import('./verify-otp/verify-otp.module').then(
        (m) => m.VerifyOTPPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
