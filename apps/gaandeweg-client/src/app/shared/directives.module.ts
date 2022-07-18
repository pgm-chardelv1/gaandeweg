import { NgModule } from '@angular/core';

import { SanitizeHtmlDirective } from './sanitize-html.directive';

@NgModule({
  declarations: [SanitizeHtmlDirective],
  exports: [SanitizeHtmlDirective],
})
export class DirectivesModule {}
