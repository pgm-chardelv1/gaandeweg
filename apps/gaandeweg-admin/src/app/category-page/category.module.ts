import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryPage } from './category.page';
import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryStartComponent } from './category-start/category-start.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CategoryPageRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    CategoryPage,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryStartComponent,
  ],
})
export class CategoryPageModule {}
