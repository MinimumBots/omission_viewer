import { bold } from 'discord.js';
import { Translate } from './Translate.js';

import type { InteractionError } from '../error/InteractionError.js';

export class ReportInteractionError {
	public constructor(private readonly error: InteractionError) {
	}

	public async report(): Promise<void> {
		const { target, transPhrase, transReplacements, transLocale } = this.error.option;
		const sentence = Translate.do(transPhrase, transReplacements ?? {}, transLocale);

		await target?.reply({ content: `⚠️ ${bold(sentence)}`, ephemeral: true });
	}
}
