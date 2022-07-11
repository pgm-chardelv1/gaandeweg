import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoDetailComponent } from './info-detail/info-detail.component';
import { InfoResolverService } from './info-resolver.service';
import { InfoStartComponent } from './info-start/info-start.component';
import { InfoPage } from './info.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPage,
    children: [
      {
        path: '',
        component: InfoStartComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
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
