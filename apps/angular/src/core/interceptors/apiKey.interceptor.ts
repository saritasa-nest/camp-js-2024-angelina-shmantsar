import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Add 'Api-Key' header to request.
 * @param req - Request.
 * @param next - Next interceptor.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const apiKeyReq = req.clone({
		headers: req.headers.set(
			'Api-Key',
			'a392e76c-bd9b-4e37-a0cb-82f6aa60bb72',
		),
	});
	return next(apiKeyReq);
}
