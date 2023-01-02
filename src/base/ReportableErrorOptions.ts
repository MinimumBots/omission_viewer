import type { Message, RepliableInteraction } from 'discord.js';
import type { Replacements } from 'i18n';

export interface ReportableErrorOptions {
	target: Message | RepliableInteraction;
	transPhrase: string;
	transReplacements?: Replacements;
}
