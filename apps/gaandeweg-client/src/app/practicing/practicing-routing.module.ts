import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticingPage } from './practicing.page';

const routes: Routes = [
  {
    path: '',
    component: PracticingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticingPageRoutingModule {}
