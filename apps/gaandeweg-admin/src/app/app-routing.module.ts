import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { sectionsMetadata } from './static.metadata';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.homePage,
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'info-element',
    data: sectionsMetadata.infoPage,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./info-element-page/info-element.module').then(
        (m) => m.InfoElementModule
      ),
  },
  {
    path: 'auth',
    data: sectionsMetadata.authPage,
    component: AuthComponent,
  },
  {
    path: 'exercise',
    data: sectionsMetadata.exercisePage,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./exercise-page/exercise.module').then(
        (m) => m.ExercisePageModule
      ),
  },
  {
    path: 'category',
    data: sectionsMetadata.categoryPage,
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
