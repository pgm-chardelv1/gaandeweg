import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home-page/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'exercise',
        loadChildren: () =>
          import('../exercise-page/exercise.module').then(
            (m) => m.ExercisePageModule
          ),
      },
      {
        path: 'info',
        loadChildren: () =>
          import('../info-page/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile-page/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('../not-found-page/not-found.module').then(
            (m) => m.NotFoundPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

/**
 * @description This is the routing module for the tabs page.
 * @module TabsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
