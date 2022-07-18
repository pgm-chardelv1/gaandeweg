import { Component, OnInit } from '@angular/core';

import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isLoading = true;

  constructor(private logger: LoggingService) {}

  ngOnInit(): void {
    this.logger.log('client', 'ProfilePage.ngOnInit');
    this.isLoading = false;
  }
}
