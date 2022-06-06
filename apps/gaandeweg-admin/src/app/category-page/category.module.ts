import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './category.page';

@NgModule({
  imports: [
    CategoryPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CategoryPage],
})
export class CategoryPageModule {}
