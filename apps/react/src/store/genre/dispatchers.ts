import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

/** Fetch genres. */
export const fetchGenres = createAsyncThunk(
	'genres/fetch',
	() => GenresService.fetchGenres(),
);
