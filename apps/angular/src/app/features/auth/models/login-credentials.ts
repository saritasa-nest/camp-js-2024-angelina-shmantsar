import { RegisterCredentials } from './register-credentials';

/** Login credentials. */
export type LoginCredentials = Pick<RegisterCredentials, 'email' | 'password'>;
