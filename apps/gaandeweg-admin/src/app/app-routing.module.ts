import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'info-element',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./info-element-page/info-element.module').then(
        (m) => m.InfoElementModule
      ),
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'exercise',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./exercise-page/exercise.module').then(
        (m) => m.ExercisePageModule
      ),
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./category-page/category.module').then(
        (m) => m.CategoryPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
