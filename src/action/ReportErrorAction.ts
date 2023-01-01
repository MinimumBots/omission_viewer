import { bold, Message } from 'discord.js';
import { Translation } from '../common/Translation';

import type { ReportableError } from '../error/ReportableError';

export class ReportErrorAction {
	public constructor(
		private readonly error: ReportableError
	) {}

	public report(): Promise<Message> {
		const { target, transScope, transOptions } = this.error.option;
		const sentence = Translation.do(transScope, transOptions ?? {});

		if (target instanceof Message) {
			return target.reply({ content: `⚠️ ${bold(sentence)}` });
		}

		return target.reply({ content: `⚠️ ${bold(sentence)}`, fetchReply: true });
	}
}
