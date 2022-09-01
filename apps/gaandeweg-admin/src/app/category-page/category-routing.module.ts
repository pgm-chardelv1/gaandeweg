import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryPage } from './category.page';
import { CategoryResolverService } from './category-resolver.service';
import { CategoryStartComponent } from './category-start/category-start.component';
import { sectionsMetadata } from '../static.metadata';

const routes: Routes = [
  {
    path: '',
    data: sectionsMetadata.categoryPage,
    component: CategoryPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: sectionsMetadata.categoryPage,
        component: CategoryStartComponent,
      },
      {
        path: ':id/edit',
        data: sectionsMetadata.categoryDetailPage,
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
        resolve: [CategoryResolverService],
      },
      {
        path: 'new',
        data: sectionsMetadata.categoryDetailPage,
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
