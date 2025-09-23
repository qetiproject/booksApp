import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/ssr';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';


const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideServerRendering(),        // SSR
    ...appConfig.providers           // store, router, hydration, interceptors
  ]
})

export default bootstrap;
