import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

/** App header component. */
@Component({
	selector: 'camp-app-header',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule, RouterOutlet],
	templateUrl: './app-header.component.html',
	styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent {}
