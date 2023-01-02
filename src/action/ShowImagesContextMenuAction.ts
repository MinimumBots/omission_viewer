import { Action } from '../base/Action.js';
import { ReportableError } from '../error/ReportableError.js';
import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu.js';
import { ShowImagesService } from '../service/ShowImagesService.js';
import { TranslateCode } from '../constant/TranslateCode.js';

import type { Interaction } from 'discord.js';

export class ShowImagesContextMenuAction extends Action<'interactionCreate'> {
	protected readonly service = new ShowImagesService(this.bot);

	private readonly contextMenu =ShowImagesContextMenu.singleton;

	protected async call(interaction: Interaction): Promise<void> {
		if (!interaction.inCachedGuild() || !interaction.isMessageContextMenuCommand() || !this.contextMenu.match(interaction)) {
			return;
		}

		const payloads = this.service.makeReplyPayloads(interaction.targetMessage);
		if (!payloads.length) {
			throw new ReportableError({ target: interaction, transPhrase: TranslateCode.E0000002 });
		}

		await this.service.sendPayloads(interaction, payloads);

		return;
	}
}
