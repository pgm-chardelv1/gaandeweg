import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoElementDetailComponent } from './info-element-detail/info-element-detail.component';
import { InfoElementFormComponent } from './info-element-form/info-element-form.component';
import { InfoElementPage } from './info-element.page';

const routes: Routes = [
  {
    path: '',
    component: InfoElementPage,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: InfoElementDetailComponent,
    children: [{ path: 'edit', component: InfoElementFormComponent }],
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
