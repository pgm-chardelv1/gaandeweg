import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';

import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
// import { InfoDetailComponent } from './info-detail/info-detail.component';

@Component({
  selector: 'gaandeweg-ws-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage implements OnInit {
  isLoading = true;

  constructor(private logger: LoggingService) {}

  async ngOnInit() {
    console.log('InfoPage.ngOnInit');
  }
}
