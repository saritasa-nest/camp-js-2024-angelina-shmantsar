import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '@js-camp/angular/core/services/validation.service';
import { CurrentForm } from '@js-camp/angular/shared/constants/current-auth-form-enum';
import { CURRENT_AUTH_FORM$ } from '@js-camp/angular/shared/constants/current-auth-form';

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
		AsyncPipe,
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	/** Validation service. */
	protected readonly validationService = inject(ValidationService);

	/** Current form enum. */
	protected readonly currentFormEnum = CurrentForm;

	/** Current form. */
	protected readonly currentAuthForm$ = CURRENT_AUTH_FORM$;
}
