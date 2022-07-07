import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '@gaandeweg-ws/data-access';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'gaandeweg-ws-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading = true;

  constructor() {}
}
