import { Component, OnInit } from '@angular/core';

import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage implements OnInit {
  /**
   * @param {boolean} isLoading Component loading state
   */
  isLoading = true;

  constructor(private logger: LoggingService) {}

  /**
   * Initializes the page.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    this.logger.log('client', 'InfoPage.ngOnInit');
    this.isLoading = false;
  }
}
