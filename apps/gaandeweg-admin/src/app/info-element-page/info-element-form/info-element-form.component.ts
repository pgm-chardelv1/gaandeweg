import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InfoElement } from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';
import { InfoService, LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent implements OnChanges {
  @Input() infoId!: number;
  @Input() dataChanged!: string;
  infoElement!: InfoElement;
  infoElementForm!: FormGroup;
  infoElementFormErrors!: { [key: string]: string };
  infoElementFormTouched!: boolean;
  infoElementFormSubmitted!: boolean;
  infoElementFormValid!: boolean;
  infoElementFormSubmitting!: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private infoElementService: InfoService,
    private logger: LoggingService
  ) {
    this.infoElementForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      definition: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  async ngOnChanges(infoId: SimpleChanges): Promise<void> {
    this.infoElement = await firstValueFrom(
      this.infoElementService.getInfoElement(this.infoId)
    );
    console.log(this.dataChanged);
    // this.dataChanged = this.infoElement.text;
    this.infoElementForm.patchValue(this.infoElement);
  }

  async dataChangedHandler(dataChanged: string): Promise<void> {
    console.log('change data', this.dataChanged);
    this.infoElementForm.patchValue({ text: this.dataChanged });
  }

  async onSubmit(): Promise<void> {
    this.logger.log('admin', this.infoElementForm.value);
  }
}
