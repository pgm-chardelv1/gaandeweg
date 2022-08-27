import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../header/header.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileDetailViewComponent } from './profile-detail-view/profile-detail-view.component';
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
    SharedModule,
    ProfilePageRoutingModule,
  ],
  declarations: [
    ProfilePage,
    ProfileListComponent,
    ProfileDetailComponent,
    ProfileDetailViewComponent,
    ProfileStartComponent,
  ],
})
export class ProfilePageModule {}
