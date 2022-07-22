import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { Category, CategoryService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-category-form-component',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges, OnDestroy, OnInit {
  id = 0;
  category!: Category;
  categorySub = new Subscription();
  categoryForm!: FormGroup;
  categoryFormErrors!: { [key: string]: string };
  categoryFormTouched!: boolean;
  categoryFormSubmitted!: boolean;
  categoryFormValid!: boolean;
  categoryFormSubmitting!: boolean;
  editMode = false;

  constructor(
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(categoryForm: SimpleChanges): void {
    console.log(categoryForm);
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [1, Validators.required],
      version: ['1', Validators.required],
      name: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.editMode) {
      this.categorySub = this.categoryService
        .getCategory(this.id)
        .subscribe((category: Category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        });
    }
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    this.categoryFormSubmitted = true;
    this.categoryFormValid = this.categoryForm.valid;

    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      if (this.editMode) {
        console.log('CategoryFormComponent.onSubmit.update', category);
        this.categoryService.updateCategory(this.id, category);
        this.router.navigate(['/category', this.id, 'edit']);
      } else {
        console.log('CategoryFormComponent.onSubmit.create', category);
        this.categoryService.createCategory(category);
        this.router.navigate(['/category']);
      }
    }
  }
}
