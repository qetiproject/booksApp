import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AuthEffects, AuthReducer, UserEffects, UserReducer } from "@auth-module";
import { BookEffect, BookReducer } from "@book-module";
import { AuthInterceptor, GlobalHttpErrorInterceptor, LoadingInterceptor } from '@core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from './app.routes';

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
      user: UserReducer,
      books: BookReducer
    }),
    provideEffects([AuthEffects, UserEffects,  BookEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
};
