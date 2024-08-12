import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { AnimeType } from '@js-camp/angular/core/models/anime-type';

import { AnimeTypeFilterComponent } from '../features/anime-type-filter/anime-type-filter.component';
import { SearchFormComponent } from '../features/search-form/search-form.component';
import { AnimeTableComponent } from '../features/anime-table/anime-table.component';

/** Main page. */
@Component({
	selector: 'camp-main-page',
	standalone: true,
	imports: [CommonModule, AnimeTypeFilterComponent, SearchFormComponent, AnimeTableComponent, AsyncPipe],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
	/** Filter. */
	protected readonly filter$ = new BehaviorSubject<readonly AnimeType[]>([]);

	/** Search. */
	protected readonly search$ = new BehaviorSubject('');

	/**
	 * On search value change.
	 * @param event Search value change event.
	 */
	protected onSearchValueChange(event: string): void {
		this.search$.next(event);
	}

	/**
	 * On filter value change.
	 * @param event Filter value change event.
	 */
	protected onFilterValueChange(event: readonly AnimeType[]): void {
		this.filter$.next(event);
	}
}
