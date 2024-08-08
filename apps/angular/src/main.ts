import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app/app.routes';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([apiKeyInterceptor, authTokenInterceptor])),
	],
}).catch(err => console.error(err));
