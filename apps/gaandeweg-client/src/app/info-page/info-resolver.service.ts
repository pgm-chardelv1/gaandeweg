import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { InfoElement, InfoService } from '@gaandeweg-ws/data-access';

/**
 * Resolves the info elements for the page.
 * @returns {Promise<InfoElement[]>}
 */
@Injectable({ providedIn: 'root' })
export class InfoResolverService implements Resolve<InfoElement[]> {
  constructor(private infoElementService: InfoService) {}

  /**
   * Resolves the info elements for the current route.
   * @param {ActivatedRouteSnapshot} route - the route to resolve
   * @param {RouterStateSnapshot} state - the router state to resolve
   * @returns {Promise<InfoElement[]>} - the info elements for the current route
   */
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<InfoElement[]> {
    const infoElements = await lastValueFrom(
      this.infoElementService.getInfoElements()
    );

    if (infoElements.length === 0) {
      return await lastValueFrom(this.infoElementService.getInfoElements());
    } else {
      return infoElements;
    }
  }
}
