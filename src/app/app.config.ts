import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from './app.routes';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthEffects } from './features/auth/store/auth.effects';
import { AuthReducer } from './features/auth/store/auth.reducer';
import { BookEffect } from './features/books/store/book.effect';
import { BookReducer } from './features/books/store/book.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        globalHttpErrorInterceptor,
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
