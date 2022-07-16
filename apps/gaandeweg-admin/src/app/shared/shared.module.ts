import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent, WysiwygComponent],
  imports: [CKEditorModule, FormsModule, ReactiveFormsModule],
  exports: [LoadingSpinnerComponent, WysiwygComponent],
})
export class SharedModule {}
