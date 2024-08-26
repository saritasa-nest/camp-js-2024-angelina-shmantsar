import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { LoginCredentials } from '../models/login-credentials';

export namespace LoginCredentialsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Model.
	 * @returns Login credentials DTO.
	 */
	export function toDto(model: LoginCredentials): LoginCredentialsDto {
		return {
			email: model.email,
			password: model.password,
		};
	}
}
