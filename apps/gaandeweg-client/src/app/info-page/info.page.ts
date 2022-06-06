import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';

import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { InfoDetailComponent } from './info-detail/info-detail.component';

@Component({
  selector: 'gaandeweg-ws-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  providers: [InfoDetailComponent, InfoService, LoggingService],
})
export class InfoPage implements OnInit {
  isLoading = true;
  infoElements: InfoElement[] = [];
  activeId = 1;
  searchListCopy: InfoElement[] = [];
  searchTerms = '';
  public searchKey: FormControl;

  constructor(
    private infoService: InfoService,
    private logger: LoggingService
  ) {
    this.searchKey = new FormControl('');
  }

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

  resetChanges = () => {
    this.infoElements = this.searchListCopy;
    this.searchTerms = '';
  };

  async ngOnInit() {
    this.infoElements = await firstValueFrom(
      this.infoService.getInfoElements()
    );

    this.searchListCopy = this.infoElements;
    this.searchTerms = this.searchKey.value;
    this.isLoading = false;
  }

  async setActive(id: number) {
    this.activeId = id;
    this.logger.log('client', `Set active info element with id ${id}`);
  }

  isActive(id: number) {
    return this.activeId === id;
  }
}
