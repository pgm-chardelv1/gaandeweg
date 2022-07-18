import { Component, OnInit } from '@angular/core';

import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage implements OnInit {
  isLoading = true;

  constructor(private logger: LoggingService) {}

  async ngOnInit() {
    this.logger.log('client', 'InfoPage.ngOnInit');
    this.isLoading = false;
  }
}
