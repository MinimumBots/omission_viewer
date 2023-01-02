import type { InteractionErrorOption } from '../base/InteractionErrorOption.js';

/**
 * The exception representing a reportable error.
 */
export class InteractionError extends Error {
	public constructor(
		public readonly option: InteractionErrorOption,
	) {
		super();
	}
}
