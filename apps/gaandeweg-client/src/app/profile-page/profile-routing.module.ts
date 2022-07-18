import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfilePage } from './profile.page';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileStartComponent } from './profile-start/profile-start.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'list',
        component: ProfileStartComponent,
      },
      {
        path: ':id',
        component: ProfileDetailComponent,
        resolve: [ProfileResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
