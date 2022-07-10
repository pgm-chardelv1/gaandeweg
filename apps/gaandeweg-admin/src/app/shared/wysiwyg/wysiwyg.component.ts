import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/nl.js';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'gaandeweg-ws-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss'],
})
export class WysiwygComponent {
  public isDisabled = false;
  isLoading = true;
  public Editor = ClassicEditorBuild;
  public config = {
    language: {
      ui: 'nl',
      content: 'nl',
    },
  };
  public model = {
    editorData: '<p>Hello, world!</p>',
  };
  @Input() data!: string;
  @Output() dataChanged = new EventEmitter<string>();

  public onContentChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
    this.outputData();
  }

  public outputData(): void {
    this.dataChanged.emit(this.data);
  }
}
