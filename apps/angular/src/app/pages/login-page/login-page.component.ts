import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from '../../features/auth/components/login-form/login-form.component';

/** Login page. */
@Component({
	selector: 'camp-login-page',
	standalone: true,
	imports: [CommonModule, LoginFormComponent],
	templateUrl: './login-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
