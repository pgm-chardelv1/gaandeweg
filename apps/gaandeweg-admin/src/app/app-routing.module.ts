import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { InfoElementsComponent } from './info-elements/info-elements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info-elements',
    pathMatch: 'full',
  },
  {
    path: 'info-elements',
    component: InfoElementsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InfoElementsComponent },
      { path: ':id', component: InfoElementsComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
