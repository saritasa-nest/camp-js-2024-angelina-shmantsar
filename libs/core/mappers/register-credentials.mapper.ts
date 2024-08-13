import { RegisterCredentialsDto } from '../dtos/register-credentials.dto';
import { RegisterCredentials } from '../models/register-credentials';

export namespace RegisterCredentialsMapper {

	/**
	 * Maps model to DTO.
	 * @param model Model.
	 * @returns Register credentials DTO.
	 */
	export function toDto(model: RegisterCredentials): RegisterCredentialsDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			password: model.password,
			avatarUrl: model.avatarUrl,
		};
	}
}
