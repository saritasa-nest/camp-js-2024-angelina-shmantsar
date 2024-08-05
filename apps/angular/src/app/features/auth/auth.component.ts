import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { AuthFormService, CurrentForm } from '@js-camp/angular/app/features/auth/services/auth-form.service';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

/** Auth component. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		LoginFormComponent,
		RegistrationFormComponent,
	],
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
}
