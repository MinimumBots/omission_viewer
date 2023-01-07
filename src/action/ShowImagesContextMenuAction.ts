import { InteractionAction } from '../base/InteractionAction.js';
import { InteractionError } from '../error/InteractionError.js';
import { ShowImagesContextMenu } from '../command/ShowImagesContextMenu.js';
import { ShowImagesService } from '../service/ShowImagesService.js';
import { TranslateCode } from '../constant/TranslateCode.js';

import type { Interaction } from 'discord.js';

export class ShowImagesContextMenuAction extends InteractionAction {
	protected readonly startActionMessage: `Start ${string}.` = `Start ${ShowImagesContextMenuAction.name}.`;
	protected readonly finishActionMessage: `Finish ${string}.` = `Finish ${ShowImagesContextMenuAction.name}.`;

	protected readonly service = new ShowImagesService(this.bot);

	protected async process(interaction: Interaction): Promise<void> {
		const contextMenu = ShowImagesContextMenu.singleton;

		if (!interaction.inCachedGuild() || !interaction.isMessageContextMenuCommand() || !contextMenu.match(interaction)) {
			return;
		}

		const payloads = this.service.buildReplyPayloads(interaction.targetMessage, interaction.locale);
		if (payloads.length < 1) {
			throw new InteractionError({ transPhrase: TranslateCode.ERR00002 });
		}

		await this.service.sendPayloads(interaction, payloads);

		return;
	}
}
