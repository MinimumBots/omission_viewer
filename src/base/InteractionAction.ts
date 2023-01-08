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
			let interactionError: InteractionError;

			if (error instanceof InteractionError) {
				interactionError = error;
			}

			if (interaction.isRepliable()) {
				interactionError ??= new InteractionError({
					transPhrase: TranslateCode.ERR00001,
					transLocale: interaction.locale,
				});
				interactionError.option.target = interaction;

				return new InteractionErrorReporter(interactionError).report();
			}

			throw error;
		}
	}

	protected abstract process(interaction: Interaction): Promise<object | null>;
}
