import { Action } from './Action.js';
import { InteractionError } from '../error/InteractionError.js';

import type { Interaction } from 'discord.js'
import { TranslateCode } from '../constant/TranslateCode.js';
import { ReportInteractionError } from '../common/ReportInteractionError.js';
import { Logger } from '../common/Logger.js';

export abstract class InteractionAction extends Action<'interactionCreate'> {
	protected override async call(interaction: Interaction): Promise<void> {
		try {
			await this.process(interaction);
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

				await new ReportInteractionError(interactionError).report();
			}

			if (!(error instanceof InteractionError)) {
				throw error;
			}
		}
	}

	protected abstract process(interaction: Interaction): Promise<void>
}
