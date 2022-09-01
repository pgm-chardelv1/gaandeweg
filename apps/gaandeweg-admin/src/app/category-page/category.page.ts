import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import {
  Category,
  CategoryService,
  LoggingService,
  SEOService,
} from '@gaandeweg-ws/data-access';

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
    private logger: LoggingService,
    private route: ActivatedRoute,
    private SEOService: SEOService
  ) {}
  async ngOnInit(): Promise<void> {
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.logger.log('admin', 'Loaded categories');

    const { meta } = this.route.snapshot.data;
    this.SEOService.updateTitle(`${meta.title}`);
    this.SEOService.updateDescription(`${meta.description}`);
  }
}
