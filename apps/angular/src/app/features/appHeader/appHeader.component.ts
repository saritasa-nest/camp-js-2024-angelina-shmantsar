import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Represents app header. */
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './appHeader.component.html',
	styleUrls: ['./appHeader.component.css'],
})
export class AppHeaderComponent {}
