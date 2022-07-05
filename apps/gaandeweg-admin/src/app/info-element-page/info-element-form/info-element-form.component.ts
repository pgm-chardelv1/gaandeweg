import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InfoElement } from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';
import { InfoService, LoggingService } from '@gaandeweg-ws/data-access';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { WysiwygComponent } from '../../shared/wysiwyg/wysiwyg.component';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent implements OnChanges, OnInit {
  @Input() infoId!: number;
  id = 0;
  @Input() dataChanged!: string;
  @ViewChild(WysiwygComponent) wysiwyg!: WysiwygComponent;
  editMode = false;
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
    console.log(changes, this.dataChanged);
    this.infoElementForm.patchValue(this.infoElement);
    this.infoElementForm.patchValue({ text: this.dataChanged });
  }

  async dataChangedHandler(dataChanged: string): Promise<void> {
    console.log('InfoElementFormComponent.dataChangedHandler', dataChanged);
    console.log(
      'InfoElementFormComponent.dataChangedHandler',
      this.dataChanged
    );
    this.infoElementForm.patchValue({ text: this.dataChanged });
    console.log(this.infoElementForm.value);
  }

  async onSubmit(): Promise<void> {
    console.log(this.wysiwyg?.data);
    // console.log(this.dataChanged);
    this.infoElementFormSubmitted = true;
    this.infoElementFormValid = this.infoElementForm.valid;
    if (this.infoElementForm.valid) {
      const infoElement = this.infoElementForm.value;
      if (this.editMode) {
        console.log('InfoElementFormComponent.onSubmit.update', infoElement);
        this.infoElementService.updateInfoElement(this.id as number, {
          text: this.dataChanged,
          ...infoElement,
        });
      } else {
        console.log('InfoElementFormComponent.onSubmit.create', infoElement);
        this.infoElementService.createInfoElement(infoElement);
      }
      // console.log(infoElement);
      console.log(
        'InfoElementFormComponent.onSubmit',
        this.infoElementForm.value
      );
    }
  }
}
