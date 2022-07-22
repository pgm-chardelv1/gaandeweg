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
  isLoading = true;
  public Editor = ClassicEditorBuild;
  public config = {
    language: {
      ui: 'nl',
      content: 'nl',
    },
  };
  public model = {
    editorData: 'Hello, world!',
  };
  /**
   * The data input for the component.
   * @param {string} data - the data input for the component.
   * @returns None
   */
  @Input() data!: string;
  /**
   * Emits an event when the data changes.
   * @param {string} data - the data to emit.
   * @returns None
   */
  @Output() dataChanged = new EventEmitter<string>();

  /**
   * A function that is called when the content of the editor changes.
   * @param {ChangeEvent} event - The event that is passed in when the content changes.
   * @returns None
   */
  public onContentChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
    this.outputData();
  }

  /**
   * Emits the data to the dataChanged event.
   * @returns None
   */
  public outputData(): void {
    this.dataChanged.emit(this.data);
  }

  /**
   * Called when the component is initialized.
   * @param {SimpleChanges} data - The changes to the component's inputs.
   * @returns None
   */
  ngOnChanges(data: SimpleChanges): void {
    this.model.editorData = this.data;
    this.isLoading = false;
  }
}
