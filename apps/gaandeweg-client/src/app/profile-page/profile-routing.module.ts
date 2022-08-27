import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfilePage } from './profile.page';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileStartComponent } from './profile-start/profile-start.component';
import { ProfileDetailViewComponent } from './profile-detail-view/profile-detail-view.component';

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
        component: ProfileDetailViewComponent,
        resolve: [ProfileResolverService],
      },
      {
        path: ':id/edit',
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
