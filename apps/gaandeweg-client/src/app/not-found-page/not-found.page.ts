import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-not-found-page',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.logger.log(
      'client',
      `NotFoundPageComponent.ngOnInit Router URL: ${this.router.url}`
    );
  }
}
