import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InfoDetailComponent } from './info-detail.component';
import { DirectivesModule } from '../../shared/directives.module';

@NgModule({
  imports: [CommonModule, IonicModule, DirectivesModule],
  declarations: [InfoDetailComponent],
  exports: [InfoDetailComponent],
})
export class InfoDetailComponentModule {}
