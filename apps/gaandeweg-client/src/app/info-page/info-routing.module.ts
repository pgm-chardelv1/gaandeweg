import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPage } from './info.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InfoPageRoutingModule {}
