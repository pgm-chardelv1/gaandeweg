import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [LoadingSpinnerComponent, WysiwygComponent],
  imports: [CKEditorModule],
  exports: [LoadingSpinnerComponent, WysiwygComponent],
})
export class SharedModule {}
