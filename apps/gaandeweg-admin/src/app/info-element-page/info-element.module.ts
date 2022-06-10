import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InfoElementFormComponentModule } from './info-element-form/info-element-form.module';
import { InfoElementRoutingModule } from './info-element-routing.module';
import { InfoElementPage } from './info-element.page';

@NgModule({
  imports: [
    CommonModule,
    InfoElementRoutingModule,
    InfoElementFormComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [InfoElementPage],
})
export class InfoElementModule {}
