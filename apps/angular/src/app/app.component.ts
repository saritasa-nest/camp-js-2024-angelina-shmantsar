import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './features/app-header/app-header.component';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [RouterModule, AppHeaderComponent],
})
export class AppComponent {}
