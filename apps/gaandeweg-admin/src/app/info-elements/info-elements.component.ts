import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { InfoService } from './info.service';
import { InfoElement } from './info.model';

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
