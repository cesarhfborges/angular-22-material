import { Routes } from '@angular/router';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';
import { BasicLayoutComponent } from './shared/layouts/basic-layout/basic-layout.component';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', loadChildren: () => import('./pages/pages.routes') }],
  },
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [guestGuard],
    children: [{ path: '', loadChildren: () => import('./guest/guest.routes') }],
  },
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  {
    path: '**',
    redirectTo: '404',
  },
];
