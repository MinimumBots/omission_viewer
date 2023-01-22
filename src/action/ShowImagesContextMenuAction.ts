import { InteractionAction } from '../base/InteractionAction.js';
import { InteractionError } from '../error/InteractionError.js';
import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu.js';
import { ShowImagesService } from '../service/ShowImagesService.js';
import { TranslateCode } from '../constant/TranslateCode.js';

import type { Interaction } from 'discord.js';

export class ShowImagesContextMenuAction extends InteractionAction {
	protected override readonly service = new ShowImagesService(this.bot);

	protected override async process(interaction: Interaction): Promise<object | null> {
		const contextMenu = ShowImagesContextMenu.singleton;

		if (!interaction.inGuild() || !interaction.isMessageContextMenuCommand() || !contextMenu.match(interaction)) {
			return null;
		}

		const payloads = this.service.buildReplyPayloads(await interaction.targetMessage.fetch(), interaction.locale);
		if (payloads.length < 1) {
			throw new InteractionError({
				target: interaction,
				transPhrase: TranslateCode.ERR00002,
				transLocale: interaction.locale,
			});
		}

		return this.service.sendPayloads(interaction, payloads);
	}
}
