import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import {
  Category,
  CategoryService,
  InfoElement,
  InfoService,
  LoggingService,
  SEOService,
} from '@gaandeweg-ws/data-access';
import { WysiwygComponent } from '../../shared/wysiwyg/wysiwyg.component';

@Component({
  selector: 'gaandeweg-ws-info-element-form-component',
  templateUrl: './info-element-form.component.html',
  styleUrls: ['./info-element-form.component.scss'],
})
export class InfoElementFormComponent implements OnInit {
  @Input() infoId!: number;
  @Input() dataChanged!: string;
  @ViewChild(WysiwygComponent) wysiwyg!: WysiwygComponent;

  faFloppyDisk = faFloppyDisk;
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
    private router: Router,
    private SEOService: SEOService
  ) {
    this.infoElementForm = this.formBuilder.group({
      id: ['', Validators.required],
      version: [''],
      name: ['', Validators.required],
      definition: ['', Validators.required],
      text: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.infoElement = this.newInfoElement;
    try {
      this.route.params.subscribe(async (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.logger.log(
          'admin',
          `InfoElementFormComponent.ngOnInit.editMode: ${this.editMode}`
        );
        const formInitiated = await this.initForm();
        if (formInitiated) {
          this.logger.log(
            'admin',
            'InfoElementFormComponent.ngOnInit.isInitiated'
          );
        }
      });
      this.categories = await firstValueFrom(
        this.categoryService.getCategories()
      );
      const { meta } = this.route.snapshot.data;
      this.SEOService.updateTitle(
        `${meta.title} ${
          this.editMode
            ? 'Bewerk ' + this.infoElement.name
            : 'Nieuw info element'
        }`
      );
    } catch (err: any) {
      console.error(err);
    }
  }

  async dataChangedHandler(dataChanged: string): Promise<void> {
    this.logger.log(
      'admin',
      `InfoElementFormComponent.dataChangedHandler.dataChanged: ${dataChanged}`
    );
  }

  async onSubmit(): Promise<void> {
    this.logger.log('admin', 'InfoElementFormComponent.onSubmit');

    this.infoElementForm.patchValue({ text: this.wysiwyg?.data });
    this.infoElementFormSubmitted = true;
    this.infoElementFormValid = this.infoElementForm.valid;

    if (this.infoElementFormValid) {
      const infoElement = this.infoElementForm.value;
      if (this.editMode) {
        this.infoElementService.updateInfoElement(
          this.id as number,
          this.infoElementForm.value
        );
        this.router.navigate(['/info-element', this.id, 'edit']);
      } else {
        this.infoElementService.createInfoElement({
          ...infoElement,
          version: '1.0.0',
          publishedById: 'admin',
        });
        this.router.navigate(['info-element']);
      }
    }
  }

  async initForm() {
    try {
      if (this.editMode) {
        this.infoElementSub = this.infoElementService
          .getInfoElement(this.id as number)
          .subscribe((infoElement: InfoElement) => {
            this.infoElement = infoElement;
            this.infoElementForm.patchValue(infoElement);
            if (infoElement && infoElement.text) {
              this.wysiwyg.data = this.infoElement.text;
              this.infoElementForm.patchValue({ text: infoElement?.text });
              this.isLoading = false;
            } else if (infoElement) {
              this.logger.log(
                'admin',
                `InfoElementFormComponent.initForm infoElement has been found. 
                
                Found wysiwyg component, setting wysiwyg data ${!!this
                  .wysiwyg}} to infoElement.text ${infoElement.text}`
              );
              if (this.wysiwyg) {
                this.wysiwyg.data = infoElement.text;
              }
              this.infoElementForm.patchValue({ text: infoElement.text });
              this.isLoading = false;
            } else {
              this.logger.log(
                'admin',
                `InfoElementFormComponent.initForm infoElement NOT found. 
                
                Found wysiwyg component, setting wysiwyg data ${!!this
                  .wysiwyg}} to infoElement.text ${this.newInfoElement.text}`
              );
              if (this.wysiwyg) {
                this.wysiwyg.data = this.newInfoElement.text;
              }
              this.infoElementForm.patchValue({
                text: this.newInfoElement.text,
              });
              this.infoElementForm.patchValue({
                version: '1.0',
              });
              this.isLoading = false;
            }
          });
      } else {
        this.infoElementForm.patchValue(this.newInfoElement);
        this.logger.log(
          'admin',
          'InfoElementFormComponent.initForm.newInfoElement - Could not find infoElement'
        );
        this.isLoading = false;
      }
      return true;
    } catch (err: any) {
      this.logger.log(
        'admin',
        `InfoElementFormComponent.initForm.err subscription failed to initialize infoElement form ${err}`
      );
      return false;
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.logger.log(
      'admin',
      `InfoElementFormComponent.ngOnChanges.changes: ${JSON.stringify(
        changes
      )}, ${JSON.stringify(this.infoElement)}`
    );
    this.infoElementForm.patchValue(this.infoElement);
    this.infoElementForm.patchValue({ text: this.dataChanged });
  }
}
