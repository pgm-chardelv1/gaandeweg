import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {
  cacheStorage!: Cache;
  constructor() {
    if ('caches' in window) {
      this.openCache();
    }
  }

  async openCache() {
    caches.open('gaandeweg-ws-cache').then((res) => (this.cacheStorage = res));
  }

  async put(req: string, body: any) {
    body = JSON.stringify(body);
    const response = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await this.cacheStorage.put(req, response);
  }

  async get(req: string) {
    const response = await this.cacheStorage.match(req);

    if (!response) throw Error('No response');

    const body = await response.json();
    return new HttpResponse({ body, status: 200, statusText: 'OK' });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const useCache = req.params.get('_useCache');

    // Remove the interceptor params from the request
    req.clone({ params: req.params.delete('_useCache') });

    if (!('caches' in window)) return next.handle(req);

    const cacheRequest = req.urlWithParams;
    const observable = next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse && useCache) {
          this.put(cacheRequest, res.body);
        }
      })
    );

    if (useCache) {
      return from(this.get(cacheRequest)).pipe(catchError((_) => observable));
    }

    return observable;
  }
}
