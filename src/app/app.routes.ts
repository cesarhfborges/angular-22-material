import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  // },
  {
    path: '**',
    redirectTo: '404',
  },
];
