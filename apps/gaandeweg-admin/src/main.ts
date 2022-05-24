import { enableProdMode, TRANSLATIONS } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const translations = './locale/messages.nl.xlf';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [{ provide: TRANSLATIONS, useValue: translations }],
  })
  .catch((err) => console.error(err));
