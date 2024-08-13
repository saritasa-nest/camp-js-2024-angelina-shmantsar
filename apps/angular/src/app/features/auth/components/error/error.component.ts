import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';

/** Error component. */
@Component({
	selector: 'camp-error',
	standalone: true,
	imports: [CommonModule, MatInputModule, AsyncPipe],
	templateUrl: './error.component.html',
	styleUrl: './error.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
	/** Error message. */
	@Input()
	public set errorMessage(value: string) {
		this.errorMessage$.next(value);
	}

	/** Error message. */
	protected readonly errorMessage$ = new BehaviorSubject('');
}
