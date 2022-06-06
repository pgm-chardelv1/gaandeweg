import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InfoElementRoutingModule } from './info-element-routing.module';
import { InfoElementPage } from './info-element.page';

@NgModule({
  imports: [
    CommonModule,
    InfoElementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [InfoElementPage],
})
export class InfoElementModule {}
