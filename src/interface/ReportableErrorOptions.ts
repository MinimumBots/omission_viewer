import type { Message, RepliableInteraction } from 'discord.js';
import type { TranslateOptions } from 'i18n-js/typings/typing';

export interface ReportableErrorOptions {
	target: Message | RepliableInteraction;
	transScope: string;
	transOptions?: TranslateOptions;
}
