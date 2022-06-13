import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoElementDetailComponent } from './info-element-detail/info-element-detail.component';
import { InfoElementFormComponent } from './info-element-form/info-element-form.component';
import { InfoElementResolverService } from './info-element-resolver.service';
import { InfoElementPage } from './info-element.page';

const routes: Routes = [
  {
    path: '',
    component: InfoElementPage,
    pathMatch: 'full',
    redirectTo: '1/edit',
  },
  {
    path: ':id',
    component: InfoElementDetailComponent,
    resolve: [InfoElementResolverService],
  },
  {
    path: ':id/edit',
    component: InfoElementFormComponent,
    resolve: [InfoElementResolverService],
  },
  {
    path: 'new',
    component: InfoElementFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InfoElementRoutingModule {}
