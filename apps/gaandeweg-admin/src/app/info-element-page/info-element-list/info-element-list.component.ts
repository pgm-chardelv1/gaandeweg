import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  faFloppyDisk,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import {
  InfoElement,
  InfoService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-info-element-list',
  templateUrl: './info-element-list.component.html',
  styleUrls: ['./info-element-list.component.scss'],
})
export class InfoElementListComponent implements OnInit /* , OnDestroy */ {
  faFloppyDisk = faFloppyDisk;
  faPlus = faPlus;
  faTrash = faTrash;
  infoElements: InfoElement[] = [];
  infoElementSub = new Subscription();

  constructor(
    private infoService: InfoService,
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.logger.log('admin', 'InfoElementListComponent.ngOnInit');
    this.infoElementSub = this.infoService
      .getInfoElements()
      .subscribe((infoElements: InfoElement[]) => {
        this.infoElements = infoElements;
      });
  }

  onNewInfoElement() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  /*   ngOnDestroy(): void {
    this.infoElementSub.unsubscribe();
  } */

  onDeleteInfoElement(infoElementId: number) {
    if (confirm('Ben je zeker dat je dit Info Element wilt verwijderen?')) {
      this.infoService.deleteInfoElement(infoElementId).subscribe(() => {
        this.infoElements = this.infoElements.filter(
          (infoElement: InfoElement) => infoElement.id !== infoElementId
        );
      });
    }
  }
}
