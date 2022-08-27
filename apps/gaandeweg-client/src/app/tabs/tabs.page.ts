import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '@gaandeweg-ws/data-access';

/**
 * The tabs page.
 * @param {Router} router - the router object
 * @param {ActivatedRoute} route - the activated route object
 * @returns None
 */
@Component({
  selector: 'gaandeweg-ws-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.logger.log(
      'client',
      `TabsPage.ngOnInit Router URL: ${this.router.url}`
    );
  }
}
