import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** Paginator. */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	imports: [CommonModule, MatPaginatorModule],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
	/** Page event emitter. */
	@Output()
	public readonly pageEventEmitter = new EventEmitter<PageEvent>();

	/** Total count. */
	@Input()
	public totalCount = 0;

	/** Page number. */
	@Input()
	public pageNumber = 0;

	/** Page size. */
	@Input()
	public pageSize = 25;

	/** Page sizes. */
	@Input()
	public pageSizes: readonly number[] = [];

	/**
	 * On page event.
	 * @param event Page event.
	 */
	protected onPageEvent(event: PageEvent): void {
		this.pageEventEmitter.emit(event);
	}
}
