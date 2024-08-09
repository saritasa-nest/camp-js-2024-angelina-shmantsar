import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

/** Validation service. */
@Injectable({ providedIn: 'root' })
export class ValidationService {
	/**
	 * Check if control has error.
	 * @param errorCode - Error code.
	 * @param control - Control.
	 */
	public hasError(control: FormControl, errorCode: string): boolean {
		return control.hasError(errorCode) && (control.touched || control.dirty);
	}

	/**
	 * Check if passwords are equal.
	 * @param control - Control.
	 */
	public passwordIdentityValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const retypedPassword = control.get('retypedPassword');
		return password && retypedPassword && password.value === retypedPassword.value ?
			null :
			{ passwordMismatch: true };
	}
}
