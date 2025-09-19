import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from './app.routes';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthEffects } from './features/auth/store/auth.effects';
import { AuthReducer } from './features/auth/store/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        globalHttpErrorInterceptor,
      ])
    ),
    provideStore({
      auth: AuthReducer
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
};
