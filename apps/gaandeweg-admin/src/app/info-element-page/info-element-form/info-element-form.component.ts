import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Category,
  CategoryService,
  InfoElement,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom, Subscription } from 'rxjs';
import { InfoService, LoggingService } from '@gaandeweg-ws/data-access';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WysiwygComponent } from '../../shared/wysiwyg/wysiwyg.component';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent
  implements /* AfterViewInit,  */ OnDestroy, OnInit
{
  @Input() infoId!: number;
  @Input() dataChanged!: string;
  @ViewChild(WysiwygComponent) wysiwyg!: WysiwygComponent;
  // @ViewChildren(WysiwygComponent) wysiwygComponents!: WysiwygComponent[];

  id = 0;
  isLoading = false;
  editMode = false;
  infoElementSub = new Subscription();

  categories: Category[] = [];
  newInfoElement: InfoElement = {
    id: 0,
    version: '',
    name: '',
    definition: '',
    text: '',
    categoryId: 1,
    published: false,
    publishedById: '',
  };
  infoElement!: InfoElement;
  infoElementForm!: FormGroup;
  private infoElementFormErrors!: { [key: string]: string };
  private infoElementFormTouched!: boolean;
  private infoElementFormSubmitted!: boolean;
  private infoElementFormValid!: boolean;
  private infoElementFormSubmitting!: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private categoryService: CategoryService,
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
      categoryId: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('InfoElementFormComponent.ngOnInit.editMode', this.editMode);
      this.initForm();
    });
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
  }

  async dataChangedHandler(dataChanged: string): Promise<void> {
    console.log('InfoElementFormComponent.dataChangedHandler', dataChanged);
    console.log(
      'InfoElementFormComponent.dataChangedHandler',
      this.dataChanged
    );
    console.log(this.infoElementForm.value);
  }

  async onSubmit(): Promise<void> {
    this.logger.log('admin', 'InfoElementFormComponent.onSubmit');

    this.infoElementForm.patchValue({ text: this.wysiwyg?.data });
    this.infoElementFormSubmitted = true;
    this.infoElementFormValid = this.infoElementForm.valid;
    if (this.infoElementForm.valid) {
      const infoElement = this.infoElementForm.value;
      if (this.editMode) {
        console.log('InfoElementFormComponent.onSubmit.update', infoElement);
        this.infoElementService.updateInfoElement(
          this.id as number,
          this.infoElementForm.value
        );
        this.router.navigate(['/info-element', this.id, 'edit']);
      } else {
        console.log('InfoElementFormComponent.onSubmit.create', infoElement);
        this.infoElementService.createInfoElement(infoElement);
        this.router.navigate(['/info-element']);
      }
    }
  }

  private initForm(): void {
    if (this.editMode) {
      this.infoElementSub = this.infoElementService
        .getInfoElement(this.id as number)
        .subscribe((infoElement: InfoElement) => {
          this.infoElement = infoElement;
          this.infoElementForm.patchValue(infoElement);
          this.wysiwyg.data = infoElement.text;
        });
    } else {
      this.infoElement = this.newInfoElement;
    }
    // console.log(this.infoElement);

    this.infoElementForm = this.formBuilder.group({
      id: [this.infoElement.id],
      version: [this.infoElement.version, Validators.required],
      categoryId: [this.infoElement.categoryId, Validators.required],
      name: [this.infoElement.name, Validators.required],
      definition: [this.infoElement.definition, Validators.required],
      text: [this.infoElement.text, Validators.required],
      publishedBy: [this.infoElement.publishedById],
    });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    console.log(this.wysiwyg?.data);
    this.infoElementForm.patchValue(this.infoElement);
    this.infoElementForm.patchValue({ text: this.dataChanged });
  }

  ngOnDestroy(): void {
    this.infoElementSub.unsubscribe();
  }

  /*   async ngAfterViewInit(): Promise<void> {
    console.log('InfoElementFormComponent.ngAfterViewInit');
    console.log(this.wysiwygComponents);
    console.log(this.wysiwyg);
    this.isLoading = false;
    this.wysiwyg.data = this.infoElement?.text ? this.infoElement.text : '';
  } */
}
