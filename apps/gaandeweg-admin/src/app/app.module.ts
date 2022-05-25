import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WysiwygComponent } from './global/components/wysiwyg/wysiwyg.component';
import { InfoElementsComponent } from './info-elements/info-elements.component';

@NgModule({
  declarations: [AppComponent, WysiwygComponent, InfoElementsComponent],
  imports: [
    BrowserModule,
    CKEditorModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
