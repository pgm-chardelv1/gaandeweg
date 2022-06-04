import { IonicModule } from '@ionic/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticingPage } from './practicing.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PracticingPageRoutingModule } from './practicing-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PracticingPageRoutingModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
  declarations: [PracticingPage],
})
export class PracticingPageModule {}
