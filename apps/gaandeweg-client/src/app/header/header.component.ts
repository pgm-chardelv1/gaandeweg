import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoggingService } from '@gaandeweg-ws/data-access';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'gaandeweg-ws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /**
   * @param {string} pageTitle - the title of the page.
   * @param {boolean} isAuthenticated - whether the user is authenticated.
   * @param {boolean} isLoading - whether the user is loading.
   * @param {Subscription} userSub - the subscription to the user.
   */
  @Input() pageTitle = 'Gaandeweg Oefenapp';
  isAuthenticated = false;
  isLoading = true;
  @Output() isAuthenticated$ = this.isAuthenticated;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private logger: LoggingService
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  ngOnInit(): void {
    /**
     * A subscription to the user observable.
     * @param {Observer<User>} observer - the observer to subscribe to the user observable.
     * @returns None
     */
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.logger.log('client', user.token as string);
        this.isAuthenticated = !!user.token;
        this.logger.log(
          'client',
          this.isAuthenticated ? 'User logged in' : 'User logged out'
        );
        this.logger.log(
          'client',
          'User is authenticated: ' + this.isAuthenticated
        );
      },
      error: (error) => {
        this.logger.error(
          'client',
          `An error occurred while logging you in: ${error.message}`
        );
      },
    });
    this.isLoading = false;
  }

  /**
   * Logs the user out of the application.
   * @returns None
   */
  onLogout(): void {
    this.authService.logout();
    this.logger.log('client', 'User logged out');
  }
}
