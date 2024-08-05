import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { RegisterCredentials } from '../../models/register-credentials';
import { AuthFormService } from '../../services/auth-form.service';

/** Registration form component. */
@Component({
	selector: 'camp-registration-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './registration-form.component.html',
	styleUrl: './registration-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	private readonly authService = inject(AuthService);

	private readonly destroyReference = inject(DestroyRef);

	private readonly formBuilder = inject(FormBuilder);

	/** Auth form service. */
	protected readonly authFormService = inject(AuthFormService);

	/** Registration form. */
	protected readonly registrationForm = this.formBuilder.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8)]],
		retypedPassword: ['', Validators.required],
	}, { validators: this.validationService.passwordIdentityValidator });

	/** Has password error (password is weak). */
	protected readonly hasPasswordError = this.authFormService.hasPasswordError;

	/** On submit. */
	protected onSubmit(): void {
		if (this.registrationForm.valid) {
			const credentials = {
				...this.registrationForm.value,
			};
			this.authService
				.register(credentials as RegisterCredentials)
				.pipe(takeUntilDestroyed(this.destroyReference))
				.subscribe();
		}
	}
}
