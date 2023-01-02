import { bold, Message } from 'discord.js';
import { Translation } from '../common/Translation.js';

import type { ReportableError } from '../error/ReportableError.js';

export class ReportErrorAction {
	public constructor(
		private readonly error: ReportableError
	) {}

	public report(): Promise<Message> {
		const { target, transPhrase, transReplacements } = this.error.option;
		const sentence = Translation.do(transPhrase, transReplacements ?? {});

		if (target instanceof Message) {
			return target.reply({ content: `⚠️ ${bold(sentence)}` });
		}

		return target.reply({ content: `⚠️ ${bold(sentence)}`, fetchReply: true });
	}
}
