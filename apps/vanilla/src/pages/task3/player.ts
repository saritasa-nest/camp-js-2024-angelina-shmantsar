import { Subscriber } from './interfaces/subscriber';

/** Class representing a player. */
export class Player implements Subscriber<number> {
	public constructor() {}

	/**
	 * @param message - The message.
	 */
	public update(message: number): void {
		throw new Error(`${message}`);
	}
}
