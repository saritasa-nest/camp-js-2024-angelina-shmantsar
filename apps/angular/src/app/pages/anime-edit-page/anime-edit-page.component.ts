import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BackToMainPageButtonComponent } from '@js-camp/angular/shared/components/back-to-main-page-button/back-to-main-page-button.component';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnimeDetails } from '@js-camp/angular/core/models/anime-details';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, map, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

import { InputData, ListEditFieldComponent } from '@js-camp/angular/shared/components/list-edit-field/list-edit-field.component';

import { AnimeEditFormComponent } from '../../features/anime-edit-form/anime-edit-form.component';

/** Anime edit page. */
@Component({
	selector: 'camp-anime-edit-page',
	standalone: true,
	imports: [
		CommonModule,
		BackToMainPageButtonComponent,
		AnimeEditFormComponent,
		AsyncPipe,
		MatDividerModule,
		ListEditFieldComponent,
	],
	templateUrl: './anime-edit-page.component.html',
	styleUrl: './anime-edit-page.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditPageComponent {
	private readonly animeService = inject(AnimeService);

	private readonly activatedRoute = inject(ActivatedRoute);

	private getAnimeById(id: number): Observable<AnimeDetails> {
		return this.animeService.getAnimeById(id);
	}

	private createAnimeDetailsStream(): Observable<AnimeDetails> {
		return this.activatedRoute.paramMap.pipe(
			switchMap((params: ParamMap) => this.getAnimeById(Number(params.get('id')))),
		);
	}

	private createStudioEditListStream(): Observable<InputData[]> {
		return this.animeDetails$.pipe(
			map(value => value.studiosData.map(studio => ({ name: studio.name }))),
		);
	}

	/** Anime details. */
	protected readonly animeDetails$ = this.createAnimeDetailsStream();

	/** Studio edit list. */
	protected readonly studioEditList$ = this.createStudioEditListStream();
}
