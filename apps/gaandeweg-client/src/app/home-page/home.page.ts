import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SEOService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading = true;

  constructor(private route: ActivatedRoute, private SEOService: SEOService) {}

  ngOnInit(): void {
    const { meta } = this.route.snapshot.data;
    this.SEOService.updateTitle(`${meta.title}`);
    this.SEOService.updateDescription(`${meta.description}`);
  }
}
