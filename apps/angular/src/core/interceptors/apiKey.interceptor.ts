import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '@js-camp/angular/environments/environment';
import { Observable } from 'rxjs';

/**
 * Add 'Api-Key' header to request.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const apiKeyReq = req.clone({
		headers: req.headers.set(
			'Api-Key',
			environment.apiKey,
		),
	});
	return next(apiKeyReq);
}
