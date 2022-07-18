import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryPage } from './category.page';
import { CategoryResolverService } from './category-resolver.service';
import { CategoryStartComponent } from './category-start/category-start.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CategoryStartComponent,
      },
      {
        path: ':id/edit',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        resolve: [CategoryResolverService],
      },
      {
        path: 'new',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CategoryPageRoutingModule {}
