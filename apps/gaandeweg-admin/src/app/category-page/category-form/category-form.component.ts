import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category, CategoryService } from '@gaandeweg-ws/data-access';
import { Subscription } from 'rxjs/internal/Subscription';

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
  @Input() categoryFormErrors!: { [key: string]: string };
  @Input() categoryFormTouched!: boolean;
  @Input() categoryFormSubmitted!: boolean;
  @Input() categoryFormValid!: boolean;
  @Input() categoryFormSubmitting!: boolean;

  constructor(
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      id: [1, Validators.required],
      version: ['1', Validators.required],
      name: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnChanges(categoryForm: SimpleChanges): void {
    console.log(categoryForm);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.categorySub = this.categoryService
        .getCategory(this.id)
        .subscribe((category: Category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        });
    });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    this.categoryFormSubmitted = true;
    this.categoryFormValid = this.categoryForm.valid;
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.updateCategory(this.id, category);
      this.router.navigate(['/category', this.id, 'edit']);
    }
  }
}
