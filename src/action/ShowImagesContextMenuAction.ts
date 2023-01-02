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

		const targetMessage = interaction.targetMessage;
		if (!this.service.isShowable(targetMessage)) {
			throw new InteractionError({ transPhrase: TranslateCode.E0000001 });
		}

		const payloads = this.service.makeReplyPayloads(targetMessage, interaction.locale);
		await this.service.sendPayloads(interaction, payloads);

		return;
	}
}
