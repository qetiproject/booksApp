import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthReducer } from './features/auth/store/auth.reducer';
import { AuthState } from './features/auth/store/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        globalHttpErrorInterceptor,
        AuthInterceptor
      ])
    ),
    provideStore(),
    provideState<AuthState>('auth', AuthReducer),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
};
