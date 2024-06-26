import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderModule } from '../header/header.module';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

/**
 * @description This is the main tabs page module.
 * @class TabsPageModule
 */
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
