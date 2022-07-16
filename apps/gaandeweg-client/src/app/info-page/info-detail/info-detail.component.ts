import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss'],
})
export class InfoDetailComponent implements OnChanges, OnInit {
  infoId = 1;
  infoElement!: InfoElement;
  infoElementSub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private infoService: InfoService,
    private logger: LoggingService
  ) {}

  async ngOnChanges(infoId: SimpleChanges) {
    this.logger.log('client', `${infoId}`);
    this.infoElement = await firstValueFrom(
      this.infoService.getInfoElement(this.infoId)
    );
  }

  async ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      if (+params['id'] as number) {
        this.infoId = +params['id'];
        console.log(params);
        this.infoElement = await firstValueFrom(
          this.infoService.getInfoElement(+this.infoId)
        );
        this.logger.log(
          'client',
          `InfoDetailComponent.ngOnInit.IsInitiated: #${this.infoId}`
        );
      } else {
        console.log('Else clause of InfoDetailComponent.ngOnInit');
        this.router.navigate(['app/info/1']);
      }
    });
  }
}
