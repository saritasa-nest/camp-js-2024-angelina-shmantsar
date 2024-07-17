import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/** App header component. */
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	templateUrl: './appHeader.component.html',
	styleUrls: ['./appHeader.component.css'],
})
export class AppHeaderComponent {}
