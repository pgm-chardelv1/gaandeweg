import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoPage } from './info.page';

import { InfoPageRoutingModule } from './info-routing.module';
import { InfoDetailComponentModule } from './info-detail/info-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoDetailComponentModule,
    InfoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InfoPage],
})
export class InfoPageModule {}
