import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Category, CategoryService } from '@gaandeweg-ws/data-access';

@Injectable({ providedIn: 'root' })
export class CategoryResolverService implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Category[]> {
    const categories = await lastValueFrom(
      this.categoryService.getCategories()
    );

    if (categories.length === 0) {
      return await lastValueFrom(this.categoryService.getCategories());
    } else {
      return categories;
    }
  }
}
