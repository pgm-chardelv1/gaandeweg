import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, WysiwygComponent],
  imports: [CKEditorModule, FormsModule, ReactiveFormsModule],
  exports: [LoadingSpinnerComponent, WysiwygComponent],
})
export class SharedModule {}
