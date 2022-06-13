import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InfoElementFormComponent } from './info-element-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [InfoElementFormComponent],
  exports: [InfoElementFormComponent],
})
export class InfoElementFormComponentModule {}
