import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { ListAdComponent } from './list-ad/list-ad.component';
import { DetailAdComponent } from './detail-ad/detail-ad.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule('dashboard', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule('login', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-ad',
    component: AddAdComponent,
  },
  {
    path: 'list-ad',
    component: ListAdComponent,
  },
  {
    path: 'ad-detail/:id',
    component: DetailAdComponent
  },
];