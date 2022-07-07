import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'info',
        loadChildren: () =>
          import('../info-page/info.module').then((m) => m.InfoPageModule),
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
        path: '',
        redirectTo: '/app/home',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
