import type { RepliableInteraction } from 'discord.js';
import type { Replacements } from 'i18n';

export interface InteractionErrorOption {
	target?: RepliableInteraction;
	transPhrase: string;
	transReplacements?: Replacements;
	transLocale?: string;
}
