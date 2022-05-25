import { Component } from '@angular/core';
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
  public Editor = ClassicEditorBuild;
  public config = {
    language: {
      ui: 'nl',
      content: 'nl',
    },
  };

  pageData: string;

  constructor() {
    const defaultData = `<h1>Bewerk me!</h1>
    <p>Hallo wereld!</p>`;

    this.pageData = defaultData;
  }

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    console.log(data);
  }
}
