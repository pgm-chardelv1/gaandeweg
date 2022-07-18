import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DirectivesModule } from '../shared/directives.module';
import { HeaderModule } from '../header/header.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfileStartComponent } from './profile-start/profile-start.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderModule,
    DirectivesModule,
    ProfilePageRoutingModule,
  ],
  declarations: [
    ProfilePage,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileStartComponent,
  ],
})
export class ProfilePageModule {}