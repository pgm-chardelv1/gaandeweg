import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-category-form-component',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges {
  @Input() category!: Category;
  @Input() categoryForm!: FormGroup;
  @Input() categoryFormErrors!: { [key: string]: string };
  @Input() categoryFormTouched!: boolean;
  @Input() categoryFormSubmitted!: boolean;
  @Input() categoryFormValid!: boolean;
  @Input() categoryFormSubmitting!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
