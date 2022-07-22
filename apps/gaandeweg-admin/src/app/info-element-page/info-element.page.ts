import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { InfoElement, InfoService } from '@gaandeweg-ws/data-access';

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

  constructor(private infoService: InfoService) {}

  async ngOnInit(): Promise<void> {
    this.infoElements = await firstValueFrom(
      this.infoService.getInfoElements()
    );

    this.infoElement = await firstValueFrom(this.infoService.getInfoElement(1));

    if (this.infoElement && this.infoElements) {
      this.isLoading = false;
    }
  }

  ngOnChanges(dataChange: SimpleChanges): void {
    console.log(dataChange);
  }
}
