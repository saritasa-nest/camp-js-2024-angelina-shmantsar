import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { YOUTUBE_BASE_URL } from '../../constants/youtube-base-url';

/** Anime player. */
@Component({
	selector: 'camp-anime-player',
	standalone: true,
	imports: [CommonModule, AsyncPipe, MatCardModule, MatIconModule],
	templateUrl: './anime-player.component.html',
	styleUrl: './anime-player.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePlayerComponent {
	/** Anime trailer youtube id. */
	@Input()
	public set trailerYouTubeId(id: string) {
		this.trailerYouTubeUrl$.next(`${this.youtubeBaseUrl}${id}`);
	}

	/** Sanitizer. */
	protected readonly sanitizer = inject(DomSanitizer);

	/** Anime trailer youtube url. */
	protected readonly trailerYouTubeUrl$ = new BehaviorSubject('');

	/** Youtube base url. */
	protected readonly youtubeBaseUrl = YOUTUBE_BASE_URL;
}
