import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  // #21 CSRF Protection
  /*   HttpClientXsrfModule,
  HttpXsrfTokenExtractor, */
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {
  CacheInterceptorService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// #21 CSRF protection
/* import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME,
} from './app-xhr-manipulation'; */

/**
 * The main app module.
 * @class AppModule
 */
@NgModule({
  declarations: [AppComponent, AuthComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // #21 CSRF protection
    /*     HttpClientXsrfModule.withOptions({
      cookieName: '_csrf',
      headerName: 'X-CSRF-TOKEN',
    }), */
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptorService,
      multi: true,
    },

    // #21 CSRF Protection
    /*     HttpXsrfCookieExtractor,
    HttpXsrfInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true,
    },
    {
      provide: HttpXsrfTokenExtractor,
      useClass: HttpXsrfCookieExtractor,
    },
    {
      provide: XSRF_COOKIE_NAME,
      useValue: 'XSRF-TOKEN',
    },
    {
      provide: XSRF_HEADER_NAME,
      useValue: 'X-CSRF-TOKEN',
    }, */
    LoggingService,
  ],
  bootstrap: [AppComponent],
  exports: [AuthComponent],
})
export class AppModule {}
