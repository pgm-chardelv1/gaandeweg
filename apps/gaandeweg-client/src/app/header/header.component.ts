import { Component, Input, OnInit, Output } from '@angular/core';
import { LoggingService } from '@gaandeweg-ws/data-access';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'gaandeweg-ws-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle = 'Gaandeweg Oefenapp';
  isAuthenticated = false;
  isLoading = true;
  @Output() isAuthenticated$ = this.isAuthenticated;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => {
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
      (error) => {
        this.logger.error(
          'client',
          `An error occurred while logging you in: ${error.message}`
        );
      }
    );
    this.isLoading = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.logger.log('client', 'User logged out');
  }
}
