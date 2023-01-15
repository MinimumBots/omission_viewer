import { bold } from 'discord.js';
import { Translate } from './Translate.js';

import type { InteractionError } from '../error/InteractionError.js';

export class InteractionErrorReporter {
	public constructor(private readonly error: InteractionError) {
	}

	public async report(): Promise<object | null> {
		const { target, transPhrase, transReplacements, transLocale } = this.error.option;
		const sentence = Translate.do(transPhrase, transReplacements ?? {}, transLocale);

		return target?.reply({ content: `⚠️ ${bold(sentence)}`, ephemeral: true, fetchReply: true }) ?? null;
	}
}
