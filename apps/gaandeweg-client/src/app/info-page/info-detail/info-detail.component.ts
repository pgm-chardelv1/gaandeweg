import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';

import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss'],
})
/**
 * Displays a detail of an info element.
 * @class InfoDetailComponent
 */
export class InfoDetailComponent implements OnChanges, OnInit {
  /**
   * @param {number} infoId - The id of the info element.
   * @param {InfoElement} infoElement - The info element to display.
   * @param {Subscription} infoElementSub - The subscription to the info element.
   */
  infoId = 1;
  infoElement!: InfoElement;
  infoElementSub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infoService: InfoService,
    private logger: LoggingService
  ) {}

  /**
   * Called when the component is initialized.
   * @param {SimpleChanges} infoId - The id of the info element to get.
   * @returns None
   */
  async ngOnChanges(infoId: SimpleChanges): Promise<void> {
    this.logger.log('client', `${infoId}`);
    this.infoElement = await firstValueFrom(
      this.infoService.getInfoElement(this.infoId)
    );
  }

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    /**
     * A function that takes in a route parameter and checks if it is a number.
     * If it is a number, it sets the infoId to that number.
     * If it is not a number, it navigates to the info page with id 1.
     * @param {Params} params - the route parameters
     * @returns None
     */
    this.route.params.subscribe(async (params: Params) => {
      if (+params['id'] as number) {
        this.infoId = +params['id'];

        this.infoElement = await firstValueFrom(
          this.infoService.getInfoElement(+this.infoId)
        );
        this.logger.log(
          'client',
          `InfoDetailComponent.ngOnInit.IsInitiated: #${this.infoId}`
        );
      } else {
        this.logger.log(
          'client',
          'Else clause of InfoDetailComponent.ngOnInit'
        );
        this.router.navigate(['app/info/1']);
      }
    });
  }
}
