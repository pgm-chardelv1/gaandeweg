import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, NavigationRoutingModule],
  declarations: [NavigationComponent],
})
export class NavigationModule {}
