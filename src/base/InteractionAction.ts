import { Action } from './Action.js';
import { InteractionError } from '../error/InteractionError.js';
import { InteractionErrorReporter } from '../common/InteractionErrorReporter.js';
import { TranslateCode } from '../constant/TranslateCode.js';

import type { Interaction } from 'discord.js'

export abstract class InteractionAction extends Action<'interactionCreate'> {
	protected override async call(interaction: Interaction): Promise<object | null> {
		try {
			return await this.process(interaction);
		} catch (error: unknown) {
			if (error instanceof InteractionError) {
				return new InteractionErrorReporter(error).report();
			}

			if (interaction.isRepliable()) {
				new InteractionErrorReporter(new InteractionError({
					target: interaction,
					transPhrase: TranslateCode.ERR00001,
					transLocale: interaction.locale,
				})).report();
			}

			throw error;
		}
	}

	protected abstract process(interaction: Interaction): Promise<object | null>;
}
