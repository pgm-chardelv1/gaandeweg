import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';

import {
  Category,
  CategoryService,
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoryService,
    private infoService: InfoService,
    private logger: LoggingService,
    private router: Router
  ) {
    this.searchKey = new FormControl('');
  }

  /**
   * @param {number} activeId - The id of the active info element.
   * @param {Category[]} categories - The list of categories to display.
   * @param {InfoElement[]} infoElements - The list of info elements to display.
   * @param {Subscription} infoElementsSub - The subscription to the info elements.
   * @param {boolean} isLoading - Whether the info elements are loading.
   * @param {InfoElement[]} searchListCopy - The copied list of info elements.
   * @param {string} searchTerms - The search terms.
   * @param {FormControl} searchKey - The search key.
   */
  activeId = 0;
  categories: Category[] = [];
  infoElements: InfoElement[] = [];
  infoElementsSub = new Subscription();

  isLoading = true;
  searchListCopy: InfoElement[] = [];
  searchTerms = '';
  public searchKey: FormControl;

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
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

  /**
   * Filters the info elements based on the search terms.
   * @returns None
   */
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

  /**
   * Resets the search terms and the search results.
   * @returns None
   */
  resetChanges = () => {
    this.infoElements = this.searchListCopy;
    this.searchTerms = '';
  };

  /**
   * Unsubscribes from the infoElementsSub Observable.
   * @returns None
   */
  ngOnDestroy(): void {
    this.infoElementsSub.unsubscribe();
  }

  /**
   * Sets the active info element to the one with the given id.
   * @param {number} id - the id of the info element to set active.
   * @returns None
   */
  async setActive(id: number): Promise<void> {
    this.activeId = id;
    this.logger.log('client', `Set active info element with id ${id}`);
    this.router.navigate(['app', 'info', id]);
  }

  /**
   * Gets the name of the category with the given ID.
   * @param {number} categoryId - the ID of the category to get the name of.
   * @returns {string} the name of the category with the given ID.
   */
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category?.name || '';
  }

  /**
   * Returns whether or not the given id is the active id.
   * @param {number} id - the id to check for active status
   * @returns {boolean} - whether or not the id is the active id
   */
  isActive(id: number): boolean {
    return this.activeId === id;
  }
}
