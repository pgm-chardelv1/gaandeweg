import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { sectionsMetadata } from './static.metadata';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.homePage,
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
  {
    path: 'app',
    data: sectionsMetadata.homePage,
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];
/**
 * The routing module for the application.
 * @param {RouterModule} RouterModule - The Angular RouterModule.
 * @class AppRoutingModule
 * @returns None
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
