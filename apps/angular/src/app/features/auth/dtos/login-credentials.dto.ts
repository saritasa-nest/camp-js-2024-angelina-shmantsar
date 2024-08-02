import { RegisterCredentialsDto } from './register-credentials.dto';

/** Login credentials dto. */
export type LoginCredentialsDto = Pick<RegisterCredentialsDto, 'email' | 'password'>;
