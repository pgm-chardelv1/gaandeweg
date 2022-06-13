import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InfoElement } from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';
import { InfoService, LoggingService } from '@gaandeweg-ws/data-access';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent implements OnChanges, OnInit {
  @Input() infoId!: number;
  id = 0;
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
    private logger: LoggingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.infoElementForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      definition: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.infoElement = await firstValueFrom(
        this.infoElementService.getInfoElement(this.id)
      );
      this.infoElementForm.patchValue(this.infoElement);
    });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.infoElementForm.patchValue(this.infoElement);
  }

  async dataChangedHandler(dataChanged: string): Promise<void> {
    this.infoElementForm.patchValue({ text: this.dataChanged });
  }

  async onSubmit(): Promise<void> {
    this.logger.log('admin', this.infoElementForm.value);
  }
}
