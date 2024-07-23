import { ColumnKey } from './table-column-key';

/** Defines column. */
export type Column = {

	/** Key. */
	readonly key: ColumnKey;

	/** Header. */
	readonly header: string;
};
