import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';

import {
  Category,
  CategoryService,
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'gaandeweg-ws-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
})
export class InfoListComponent implements OnInit, OnDestroy {
  activeId = 0;

  categories: Category[] = [];
  infoElements: InfoElement[] = [];
  infoElementsSub = new Subscription();

  isLoading = true;
  searchListCopy: InfoElement[] = [];
  searchTerms = '';
  public searchKey: FormControl;

  constructor(
    private categoryService: CategoryService,
    private infoService: InfoService,
    private logger: LoggingService,
    private router: Router
  ) {
    this.searchKey = new FormControl('');
  }

  async ngOnInit() {
    this.logger.log('client', 'InfoListComponent.ngOnInit');
    this.infoElementsSub = this.infoService
      .getInfoElements()
      .subscribe((infoElements: InfoElement[]) => {
        this.infoElements = infoElements;
        this.isLoading = false;
      });

    this.searchListCopy = this.infoElements;

    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );

    this.searchTerms = this.searchKey.value;
    this.isLoading = false;
    console.log('InfoListComponent.ngOnInit', this.infoElements);
  }

  search = () => {
    this.resetChanges();
    this.searchTerms = this.searchKey.value;

    this.infoElements = this.infoElements.filter((item) => {
      return (
        item.text.toLowerCase().includes(this.searchTerms.toLowerCase()) ||
        item.definition
          .toLowerCase()
          .includes(this.searchTerms.toLowerCase()) ||
        item.name.toLowerCase().includes(this.searchTerms.toLowerCase())
      );
    });
  };

  resetChanges = () => {
    this.infoElements = this.searchListCopy;
    this.searchTerms = '';
  };

  ngOnDestroy() {
    this.infoElementsSub.unsubscribe();
  }

  async setActive(id: number) {
    this.activeId = id;
    this.logger.log('client', `Set active info element with id ${id}`);
    this.router.navigate(['app', 'info', id]);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category?.name || '';
  }

  isActive(id: number) {
    return this.activeId === id;
  }
}
