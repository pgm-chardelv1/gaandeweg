import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: CategoryDetailComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'edit', component: CategoryFormComponent }],
  },
  {
    path: 'new',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CategoryPageRoutingModule {}
