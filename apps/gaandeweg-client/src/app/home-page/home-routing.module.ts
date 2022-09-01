import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { sectionsMetadata } from '../static.metadata';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.homePage,
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
