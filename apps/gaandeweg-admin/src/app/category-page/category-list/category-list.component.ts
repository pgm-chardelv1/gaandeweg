import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Category, CategoryService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorySub = new Subscription();
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categorySub = this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  onNewCategory() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDeleteCategory(categoryId: number) {
    if (confirm('Ben je zeker dat je deze categorie wilt verwijderen?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        this.categories = this.categories.filter(
          (category: Category) => category.id !== categoryId
        );
      });
    }
  }
}
