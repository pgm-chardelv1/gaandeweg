import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryStartComponent } from './category-start/category-start.component';
import { CategoryPage } from './category.page';

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
