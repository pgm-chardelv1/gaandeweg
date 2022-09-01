import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfoDetailComponent } from './info-detail/info-detail.component';
import { InfoPage } from './info.page';
import { InfoResolverService } from './info-resolver.service';
import { InfoStartComponent } from './info-start/info-start.component';
import { sectionsMetadata } from '../static.metadata';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.infoPage,
    component: InfoPage,
    children: [
      {
        path: 'list',
        data: sectionsMetadata.infoPage,
        component: InfoStartComponent,
      },
      {
        path: ':id',
        data: sectionsMetadata.infoDetailPage,
        component: InfoDetailComponent,
        resolve: [InfoResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPageRoutingModule {}
