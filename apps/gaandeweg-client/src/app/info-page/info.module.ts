import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DirectivesModule } from '../shared/directives.module';
import { HeaderModule } from '../header/header.module';
import { InfoDetailComponent } from './info-detail/info-detail.component';
import { InfoListComponent } from './info-list/info-list.component';
import { InfoPage } from './info.page';
import { InfoPageRoutingModule } from './info-routing.module';
import { InfoStartComponent } from './info-start/info-start.component';

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    InfoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InfoPage,
    InfoListComponent,
    InfoStartComponent,
    InfoDetailComponent,
  ],
})
export class InfoPageModule {}
