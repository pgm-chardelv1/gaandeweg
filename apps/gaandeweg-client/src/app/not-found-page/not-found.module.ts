import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { NotFoundPageComponent } from './not-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NotFoundPageComponent],
})
export class NotFoundPageModule {}
