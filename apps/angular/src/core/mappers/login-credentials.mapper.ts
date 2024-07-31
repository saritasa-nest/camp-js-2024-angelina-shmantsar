import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { LoginCredentials } from '../models/login-credentials';

export namespace LoginCredentialsMapper {

	/**
	 * Maps model to dto.
	 * @param model Model.
	 * @returns Login credentials dto.
	 */
	export function toDto(model: LoginCredentials): LoginCredentialsDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
