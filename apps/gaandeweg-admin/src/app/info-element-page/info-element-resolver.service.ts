import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InfoElement, InfoService } from '@gaandeweg-ws/data-access';

@Injectable({ providedIn: 'root' })
export class InfoElementResolverService implements Resolve<InfoElement[]> {
  constructor(private infoElementService: InfoService) {}

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
