import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthEffects } from '@auth-store/auth.effects';
import { AuthReducer } from '@auth-store/auth.reducer';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from './app.routes';
import { GlobalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { BookEffect } from './modules/book-module/store/book.effect';
import { BookReducer } from './modules/book-module/store/book.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        AuthInterceptor,
        LoadingInterceptor,
        GlobalHttpErrorInterceptor,
      ])
    ),
    provideStore({
      auth: AuthReducer,
      books: BookReducer
    }),
    provideEffects([AuthEffects, BookEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
};
