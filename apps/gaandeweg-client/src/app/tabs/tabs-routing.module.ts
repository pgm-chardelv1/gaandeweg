import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { sectionsMetadata } from '../static.metadata';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.homePage,
    component: TabsPage,
    children: [
      {
        path: 'auth',
        data: sectionsMetadata.authPage,
        component: AuthComponent,
      },
      {
        path: 'home',
        data: sectionsMetadata.homePage,
        loadChildren: () =>
          import('../home-page/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'exercise',
        data: sectionsMetadata.exercisePage,
        loadChildren: () =>
          import('../exercise-page/exercise.module').then(
            (m) => m.ExercisePageModule
          ),
      },
      {
        path: 'info',
        data: sectionsMetadata.infoPage,
        loadChildren: () =>
          import('../info-page/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: 'profile',
        data: sectionsMetadata.profilePage,
        loadChildren: () =>
          import('../profile-page/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'not-found',
        data: {
          meta: {
            title: 'Gaandeweg - Pagina niet gevonden',
            description: 'Pagina niet gevonden bij Gaandeweg.',
          },
        },
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
