/** Register credentials dto. */
export type RegisterCredentialsDto = {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Password. */
	readonly password: string;

	/** Avatar image url. */
	readonly avatarUrl?: string;
};
