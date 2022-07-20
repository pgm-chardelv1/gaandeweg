import { Component, OnInit } from '@angular/core';

import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
/**
 * The profile page.
 * @class ProfilePage
 */
export class ProfilePage implements OnInit {
  /**
   * @param {boolean} isLoading Component loading state
   */
  isLoading = true;

  constructor(private logger: LoggingService) {}

  /**
   * Initializes the page.
   * @returns None
   */
  ngOnInit(): void {
    this.logger.log('client', 'ProfilePage.ngOnInit');
    this.isLoading = false;
  }
}
