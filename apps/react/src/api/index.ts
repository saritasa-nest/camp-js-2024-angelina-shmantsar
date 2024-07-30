import axios from 'axios';

import { CONFIG } from './config';

/** Http client. */
export const http = axios.create({
	baseURL: CONFIG.apiUrl,
});
