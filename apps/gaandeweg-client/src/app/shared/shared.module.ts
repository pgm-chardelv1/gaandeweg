import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './components/PopoverComponent/popover.component';

import { SanitizeHtmlDirective } from './sanitize-html.directive';

@NgModule({
  imports: [IonicModule],
  declarations: [SanitizeHtmlDirective, PopoverComponent],
  exports: [SanitizeHtmlDirective, PopoverComponent],
})
export class SharedModule {}
