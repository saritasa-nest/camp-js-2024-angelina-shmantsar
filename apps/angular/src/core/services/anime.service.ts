import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_API_URL } from '../constants/backendConst';

import { GetAnimeDto } from '../interfaces/getAnimeDto';

/** Represents anime fetch service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private httpClient = inject(HttpClient);

	private baseAnimeUrl = `${BASE_API_URL}anime/`;

	public constructor() {}

	/** Method. */
	public getAllAnime(): Observable<GetAnimeDto> {
		return this.httpClient.get<GetAnimeDto>(`${this.baseAnimeUrl}anime/`);
	}
}
