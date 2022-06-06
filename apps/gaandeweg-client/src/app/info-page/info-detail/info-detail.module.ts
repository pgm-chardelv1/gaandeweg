import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InfoDetailComponent } from './info-detail.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [InfoDetailComponent],
  exports: [InfoDetailComponent],
})
export class InfoDetailComponentModule {}
