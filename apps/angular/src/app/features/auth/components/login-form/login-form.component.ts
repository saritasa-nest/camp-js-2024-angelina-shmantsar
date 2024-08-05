import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';

import { LoginCredentials } from '../../models/login-credentials';
import { AuthFormService } from '../../services/auth-form.service';

/** Login form component. */
@Component({
	selector: 'camp-login-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
	private readonly authService = inject(AuthService);

	private readonly destroyReference = inject(DestroyRef);

	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	/** Auth form service. */
	protected readonly authFormService = inject(AuthFormService);

	private readonly formBuilder = inject(FormBuilder);

	/** Has login error (invalid credentials entered). */
	protected readonly hasLoginError = this.authFormService.hasLoginError;

	/** Login form. */
	protected readonly loginForm = this.formBuilder.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	/** On submit. */
	protected onSubmit(): void {
		if (this.loginForm.valid) {
			const credentials = {
				...this.loginForm.value,
			};
			this.authService
				.login(credentials as LoginCredentials)
				.pipe(takeUntilDestroyed(this.destroyReference))
				.subscribe();
		}
	}
}
