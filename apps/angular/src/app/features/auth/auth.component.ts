import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { AuthFormService, CurrentForm } from '@js-camp/angular/core/services/auth-form.service';

/** Auth component. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	/** Auth form service. */
	protected readonly authFormService = inject(AuthFormService);

	/** Current form enum. */
	protected readonly currentFormEnum = CurrentForm;

	/** Current form. */
	protected readonly currentForm = this.authFormService.currentForm;

	/** Text on change form button. */
	protected readonly changeFormButtonText = this.authFormService.changeFormButtonText;

	/** Registration form. */
	protected readonly registrationForm = this.authFormService.registrationForm;

	/** Login form. */
	protected readonly loginForm = this.authFormService.loginForm;

	/** Form fields. */
	protected readonly fields = this.authFormService.fields;

	/** Has login error (invalid credentials entered). */
	protected readonly hasLoginError = this.authFormService.hasLoginError;

	/** Has password error (password is weak). */
	protected readonly hasPasswordError = this.authFormService.hasPasswordError;
}
