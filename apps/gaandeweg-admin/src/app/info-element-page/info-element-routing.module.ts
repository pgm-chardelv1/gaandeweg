import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { InfoElementFormComponent } from './info-element-form/info-element-form.component';
import { InfoElementResolverService } from './info-element-resolver.service';
import { InfoElementStartComponent } from './info-element-start/info-element-start.component';
import { InfoElementPage } from './info-element.page';

const routes: Routes = [
  {
    path: '',
    component: InfoElementPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: InfoElementStartComponent,
      },
      {
        path: ':id/edit',
        component: InfoElementFormComponent,
        resolve: [InfoElementResolverService],
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        component: InfoElementFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InfoElementRoutingModule {}
