import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { createPasswordStrengthValidator } from '@gaandeweg-ws/data-access';

/**
 * Switches the mode of the auth component between login and signup. Allows the user to switch between the two modes. Allows the user to register or login.
 * @returns None
 */
@Component({
  selector: 'gaandeweg-ws-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  loginForm!: FormGroup;

  /**
   * Constructor for the LoginComponent.
   * @param {AuthService} authService - The authentication service.
   * @param {Router} router - The router service.
   * @param {FormBuilder} formBuilder - The form builder service.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Initializes the login form.
   * @returns None
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator(),
        ],
      ],
    });
  }

  /**
   * Switches the mode of the app between login and signup.
   * @returns None
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Takes in the form and logs the values of the form.
   * @returns None
   */
  onSubmit() {
    const form = this.loginForm;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    /**
     * Subscribes to the authObservable and handles the response.
     * @param {Observer<any>} observer - the observer to subscribe to.
     * @returns None
     */
    authObs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        console.log('Successfully logged in.', resData);
        this.router.navigate(['/home']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        console.log('An error occurred while logging you in: ', errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('Logging in completed.');
      },
    });

    form.reset();
  }
}
