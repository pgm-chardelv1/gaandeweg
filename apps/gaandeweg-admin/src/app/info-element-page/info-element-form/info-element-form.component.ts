import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InfoElement } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent implements OnChanges {
  @Input() infoElement!: InfoElement;
  @Input() infoElementForm!: FormGroup;
  @Input() infoElementFormErrors!: { [key: string]: string };
  @Input() infoElementFormTouched!: boolean;
  @Input() infoElementFormSubmitted!: boolean;
  @Input() infoElementFormValid!: boolean;
  @Input() infoElementFormSubmitting!: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
