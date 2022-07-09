import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InfoElementFormComponent } from './info-element-form/info-element-form.component';
import { InfoElementListComponent } from './info-element-list/info-element-list.component';
import { InfoElementRoutingModule } from './info-element-routing.module';
import { InfoElementStartComponent } from './info-element-start/info-element-start.component';
import { InfoElementPage } from './info-element.page';

@NgModule({
  imports: [
    CommonModule,
    InfoElementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    InfoElementPage,
    InfoElementListComponent,
    InfoElementFormComponent,
    InfoElementStartComponent,
  ],
})
export class InfoElementModule {}
