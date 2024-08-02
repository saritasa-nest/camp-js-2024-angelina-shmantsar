import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/** 'hasError' function data. */
type HasErrorData = {

	/** Form. */
	readonly form: FormGroup;

	/** Field name. */
	readonly fieldName: string;

	/** Validator name. */
	readonly validatorName: string;
};

/** Validation service. */
@Injectable({ providedIn: 'root' })
export class ValidationService {
	/**
	 * Check if there is an error in validator.
	 * @param data - Data.
	 */
	public hasError(data: HasErrorData): boolean {
		const { form, fieldName, validatorName } = data;
		const control = form.get(fieldName);
		if (control?.invalid && (control.touched || control.dirty)) {
			if (control.errors?.[validatorName]) {
				return true;
			}
		}
		return false;
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
