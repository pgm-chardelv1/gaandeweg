import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { InfoService } from '@gaandeweg-ws/data-access';
import { InfoElement } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info-elements',
  templateUrl: './info-elements.component.html',
  styleUrls: ['./info-elements.component.scss'],
  providers: [InfoService],
})
export class InfoElementsComponent implements OnInit {
  infoElements: InfoElement[] = [];
  infoElement: Partial<InfoElement> = {};

  constructor(private infoService: InfoService) {}

  async ngOnInit(): Promise<void> {
    this.infoElements = await firstValueFrom(
      this.infoService.getInfoElements()
    );

    this.infoElement = await firstValueFrom(this.infoService.getInfoElement(1));
  }
}
