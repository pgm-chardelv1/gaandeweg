import {
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
export class WysiwygComponent implements OnChanges {
  public isDisabled = false;
  public Editor = ClassicEditorBuild;
  public config = {
    language: {
      ui: 'nl',
      content: 'nl',
    },
  };
  @Input() data!: string;
  @Output() dataChange = new EventEmitter<string>();

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
  }

  ngOnChanges(data: SimpleChanges): void {
    console.log(this.data);
  }

  onSubmit(): void {
    console.log('submit');
    this.dataChange.emit(this.data);
  }
}
