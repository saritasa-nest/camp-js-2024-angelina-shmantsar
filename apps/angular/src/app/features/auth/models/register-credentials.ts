/** Register credentials. */
export type RegisterCredentials = {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly firstName: string;

	/** Last name. */
	readonly lastName: string;

	/** Password. */
	readonly password: string;

	/** Avatar image url. */
	readonly avatar?: string;
};
