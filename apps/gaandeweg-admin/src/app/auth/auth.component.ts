import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'gaandeweg-ws-auth',
  templateUrl: './auth.component.html',
})
/**
 * The AuthComponent class.
 * @class AuthComponent
 * @implements OnInit
 */
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  loginForm!: FormGroup;

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
      password: ['', [Validators.required, Validators.minLength(5)]],
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
    console.log(this.loginForm.value);
    const form = this.loginForm;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    const authObs: Observable<AuthResponseData> = this.authService.login(
      email,
      password
    );

    this.isLoading = true;

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      () => {
        console.log('authObs complete');
      }
    );

    form.reset();
  }
}
