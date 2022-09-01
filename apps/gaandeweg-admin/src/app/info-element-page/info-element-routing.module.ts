import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { sectionsMetadata } from '../static.metadata';
import { InfoElementFormComponent } from './info-element-form/info-element-form.component';
import { InfoElementResolverService } from './info-element-resolver.service';
import { InfoElementStartComponent } from './info-element-start/info-element-start.component';
import { InfoElementPage } from './info-element.page';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.infoPage,
    component: InfoElementPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: sectionsMetadata.infoPage,
        component: InfoElementStartComponent,
      },
      {
        path: ':id/edit',
        data: sectionsMetadata.infoDetailPage,
        component: InfoElementFormComponent,
        resolve: [InfoElementResolverService],
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        data: sectionsMetadata.infoDetailPage,
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
