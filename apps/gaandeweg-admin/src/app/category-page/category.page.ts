import { Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-category-page',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  providers: [CategoryService, LoggingService],
})
export class CategoryPage implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private logger: LoggingService
  ) {}
  ngOnInit(): void {
    this.logger.log('admin', 'Loaded categories');
  }
}
