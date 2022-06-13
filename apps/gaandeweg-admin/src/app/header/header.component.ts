import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '@gaandeweg-ws/data-access';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'gaandeweg-ws-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoading = true;
  isAuthenticated = false;
  @Output() isAuthenticated$ = this.isAuthenticated;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.logger.log('admin', user.token as string);
      this.isAuthenticated = !!user.token;
      this.logger.log(
        'admin',
        this.isAuthenticated ? 'User logged in' : 'User logged out'
      );
      this.logger.log(
        'admin',
        'User is authenticated: ' + this.isAuthenticated
      );
    });
    this.isLoading = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.logger.log('admin', 'User logged out');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
