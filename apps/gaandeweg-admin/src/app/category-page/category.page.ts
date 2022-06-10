import { Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-category-page',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  providers: [CategoryService, LoggingService],
})
export class CategoryPage implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoryService: CategoryService,
    private logger: LoggingService
  ) {}
  async ngOnInit(): Promise<void> {
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.logger.log('admin', 'Loaded categories');
  }
}
