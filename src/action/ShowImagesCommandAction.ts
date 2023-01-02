import { Action } from './Action.js';
import { ReportableError } from '../error/ReportableError.js';
import { ShowImagesService } from '../service/ShowImagesService.js';
import { TranslateCode } from '../constant/TranslateCode.js';

import type { Interaction } from 'discord.js';

export class ShowImagesCommandAction extends Action<'interactionCreate'> {
	protected readonly service = new ShowImagesService(this.bot);

	protected async call(interaction: Interaction): Promise<void> {
		if (!interaction.inCachedGuild() || !interaction.isMessageContextMenuCommand()) {
			return;
		}

		const payloads = this.service.makeReplyPayloads(interaction.targetMessage);
		if (!payloads.length) {
			throw new ReportableError({ target: interaction, transScope: TranslateCode.E0000002 });
		}

		await this.service.sendPayloads(interaction, payloads);

		return;
	}
}
