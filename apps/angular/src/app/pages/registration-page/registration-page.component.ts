import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationFormComponent } from '../../features/auth/components/registration-form/registration-form.component';

/** Registration page. */
@Component({
	selector: 'camp-registration-page',
	standalone: true,
	imports: [CommonModule, RegistrationFormComponent],
	templateUrl: './registration-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {}
