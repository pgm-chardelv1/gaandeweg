import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
  declarations: [PracticingPage],
})
export class PracticingPageModule {}