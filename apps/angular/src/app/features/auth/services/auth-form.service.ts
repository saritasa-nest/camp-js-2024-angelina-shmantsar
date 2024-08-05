import { Injectable, signal } from '@angular/core';

import { HAS_LOGIN_ERROR, HAS_PASSWORD_ERROR } from '../../../../core/interceptors/auth-error.interceptor';

/** Current form. */
export enum CurrentForm {
	Register = 'Register',
	Login = 'Login',
}

/** Auth form service. */
@Injectable({ providedIn: 'root' })
export class AuthFormService {
	/** Current form. */
	public readonly currentForm = signal<CurrentForm>(CurrentForm.Login);

	/** Has login error (invalid credentials entered). */
	public readonly hasLoginError = HAS_LOGIN_ERROR;

	/** Has password error (password is weak). */
	public readonly hasPasswordError = HAS_PASSWORD_ERROR;

	/** On form change. */
	public onFormChange(): void {
		if (this.currentForm() === CurrentForm.Login) {
			this.currentForm.set(CurrentForm.Register);
		} else {
			this.currentForm.set(CurrentForm.Login);
		}
		this.hasLoginError.set(false);
		this.hasPasswordError.set(false);
	}

	/**
	 * On input value change.
	 * @param fieldName - Field name.
	 */
	public onValueChange(fieldName: string): void {
		if (fieldName === 'password' || fieldName === 'retypedPassword') {
			this.hasPasswordError.set(false);
		}
		this.hasLoginError.set(false);
	}
}
