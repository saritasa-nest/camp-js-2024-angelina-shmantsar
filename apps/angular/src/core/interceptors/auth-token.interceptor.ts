import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

/**
 * Add authorization header.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function authTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const cookieService = inject(CookieService);
	const accessToken = cookieService.get('accessToken');
	if (accessToken.length === 0) {
		return next(req);
	}
	const authTokenRequest = req.clone({
		headers: req.headers.set(
			'Authorization',
			`Bearer ${accessToken}`,
		),
	});
	return next(authTokenRequest);
}
