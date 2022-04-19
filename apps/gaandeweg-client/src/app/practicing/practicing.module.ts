import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PracticingPage } from './practicing.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PracticingPageRoutingModule } from './practicing-routing.module';
import { ExerciseFormsComponent } from './forms/exercise-forms.component';

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
  declarations: [PracticingPage, ExerciseFormsComponent],
})
export class PracticingPageModule {}
