import type { ReportableErrorOptions } from '../interface/ReportableErrorOptions.js';

/**
 * The exception representing a reportable error.
 */
export class ReportableError extends Error {
	public constructor(
		public readonly option: ReportableErrorOptions,
	) {
		super();
	}
}
