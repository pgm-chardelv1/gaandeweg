import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss'],
})
export class InfoDetailComponent implements OnChanges {
  @Input() infoId!: number;
  infoElement!: InfoElement;

  constructor(
    private infoService: InfoService,
    private logger: LoggingService
  ) {}

  async ngOnChanges(infoId: SimpleChanges) {
    this.logger.log('client', `${infoId}`);
    this.infoElement = await firstValueFrom(
      this.infoService.getInfoElement(this.infoId)
    );
  }
}
