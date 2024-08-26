import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

import { HttpErrors } from '../models/http-errors';

/** Validation service. */
@Injectable({ providedIn: 'root' })
export class ValidationService {
	/**
	 * Check if control has error.
	 * @param errorCode Error code.
	 * @param control Control.
	 */
	public hasError(control: FormControl, errorCode: string): boolean {
		return control.hasError(errorCode) && (control.touched || control.dirty);
	}

	/**
	 * Return error message.
	 * @param errorCode Error code.
	 */
	public getErrorMessage(errorCode: string): string {
		return this.commonErrors[errorCode] ?? '';
	}

	/**
	 * Is login error.
	 * @param error Error.
	 */
	public isLoginError(error: unknown): boolean {
		const httpError = error as HttpErrorResponse;
		return httpError.status === HttpErrors.Forbidden;
	}

	/**
	 * Is password error.
	 * @param error Error.
	 */
	public isPasswordError(error: unknown): boolean {
		const httpError = error as HttpErrorResponse;
		return httpError.status === HttpErrors.BadRequest;
	}

	/**
	 * Check if passwords are equal.
	 * @param control Control.
	 */
	public passwordIdentityValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const retypedPassword = control.get('retypedPassword');
		return password && retypedPassword && password.value === retypedPassword.value ?
			null :
			{ passwordMismatch: true };
	}

	private readonly commonErrors: Readonly<Record<string, string>> = {
		required: 'This field is required',
		email: 'This field should be valid email',
		minlength: 'The password must be at least 8 characters long',
	};
}
