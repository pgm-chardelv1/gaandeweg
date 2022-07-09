import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gaandeweg-ws-info-element-list',
  templateUrl: './info-element-list.component.html',
  styleUrls: ['./info-element-list.component.scss'],
})
export class InfoElementListComponent implements OnInit, OnDestroy {
  infoElements: InfoElement[] = [];
  infoElementSub = new Subscription();

  constructor(
    private infoService: InfoService,
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.logger.log('client', 'InfoElementListComponent.ngOnInit');
    this.infoElementSub = this.infoService
      .getInfoElements()
      .subscribe((infoElements: InfoElement[]) => {
        this.infoElements = infoElements;
      });
  }

  onNewInfoElement() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.infoElementSub.unsubscribe();
  }
}
