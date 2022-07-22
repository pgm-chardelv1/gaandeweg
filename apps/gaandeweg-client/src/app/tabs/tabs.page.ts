import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('TabsPage.ngOnInit', this.router.url);
  }
}
