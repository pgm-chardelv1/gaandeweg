import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Category, CategoryService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  categorySub = new Subscription();

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
}
