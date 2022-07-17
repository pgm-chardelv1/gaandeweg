import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { DirectivesModule } from '../shared/directives.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfileStartComponent } from './profile-start/profile-start.component';
import { ProfilePage } from './profile.page';

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
