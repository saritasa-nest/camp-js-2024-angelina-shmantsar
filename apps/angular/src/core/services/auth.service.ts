import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { TokensDto } from '../dtos/tokens.dto';
import { RegisterCredentials } from '../models/register-credentials';
import { RegisterCredentialsMapper } from '../mappers/register-credentials.mapper';
import { LoginCredentials } from '../models/login-credentials';
import { LoginCredentialsMapper } from '../mappers/login-credentials.mapper';

import { ApiUrlService } from './api-url.service';

/** Auth service. */
@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly httpClient = inject(HttpClient);

	private readonly urlService = inject(ApiUrlService);

	private readonly cookieService = inject(CookieService);

	/**
	 * Register user.
	 * @param credentials Credentials.
	 */
	public register(credentials: RegisterCredentials): Observable<TokensDto> {
		const registerUrl = this.urlService.auth.register;
		return this.httpClient.post<TokensDto>(registerUrl, RegisterCredentialsMapper.toDto(credentials))
			.pipe(
				tap(value => {
					this.cookieService.set('accessToken', value.access);
					this.cookieService.set('refreshToken', value.refresh);
				}),
			);
	}

	/**
	 * Login.
	 * @param credentials Credentials.
	 */
	public login(credentials: LoginCredentials): Observable<TokensDto> {
		const loginUrl = this.urlService.auth.login;
		return this.httpClient.post<TokensDto>(loginUrl, LoginCredentialsMapper.toDto(credentials))
			.pipe(
				tap(value => {
					this.cookieService.set('accessToken', value.access);
					this.cookieService.set('refreshToken', value.refresh);
				}),
			);
	}
}
