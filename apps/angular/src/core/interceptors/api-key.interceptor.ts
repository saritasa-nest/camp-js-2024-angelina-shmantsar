import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/**
 * Add 'Api-Key' header to request.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const appConfigService = inject(AppConfigService);
	const apiKeyRequest = req.clone({
		headers: req.headers.set(
			'Api-Key',
			appConfigService.apiKey,
		),
	});
	return next(apiKeyRequest);
}
