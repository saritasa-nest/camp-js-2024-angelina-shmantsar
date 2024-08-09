import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class ErrorComponent implements OnChanges {
	/** Error message. */
	@Input()
	public errorMessage = '';

	/** Error message. */
	protected readonly errorMessage$ = new BehaviorSubject('');

	/** @inheritdoc */
	public ngOnChanges(changes: SimpleChanges): void {
		this.errorMessage$.next(changes['errorMessage'].currentValue);
	}
}
