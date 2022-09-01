import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import {
  InfoElement,
  InfoService,
  LoggingService,
  SEOService,
} from '@gaandeweg-ws/data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gaandeweg-ws-info-element',
  templateUrl: './info-element.page.html',
  styleUrls: ['./info-element.page.scss'],
  providers: [InfoService],
})
export class InfoElementPage implements OnInit, OnChanges {
  @Input() dataChange!: string;
  isLoading = true;
  infoElements: InfoElement[] = [];
  infoElement!: InfoElement;

  constructor(
    private infoService: InfoService,
    private logger: LoggingService,
    private route: ActivatedRoute,
    private SEOService: SEOService
  ) {}

  async ngOnInit(): Promise<void> {
    this.infoElements = await firstValueFrom(
      this.infoService.getInfoElements()
    );

    this.infoElement = await firstValueFrom(this.infoService.getInfoElement(2));

    if (!!this.infoElement && !!this.infoElements) {
      this.isLoading = false;
    }

    const { meta } = this.route.snapshot.data;
    this.SEOService.updateTitle(`${meta.title}`);
    this.SEOService.updateDescription(`${meta.description}`);
  }

  ngOnChanges(dataChange: SimpleChanges): void {
    this.logger.log('admin', `InfoElementPage dataChange: ${dataChange}`);
  }
}
