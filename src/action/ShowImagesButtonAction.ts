import { InteractionAction } from '../base/InteractionAction.js';
import { ShowImagesComponent } from '../component/ShowImagesComponent.js';
import { ShowImagesService } from '../service/ShowImagesService.js';

import type { Interaction } from 'discord.js';

export class ShowImagesButtonAction extends InteractionAction {
	protected readonly startActionMessage: `Start ${string}.` = `Start ${ShowImagesButtonAction.name}.`;
	protected readonly finishActionMessage: `Finish ${string}.` = `Finish ${ShowImagesButtonAction.name}.`;

	protected override readonly service = new ShowImagesService(this.bot);

	protected override async process(interaction: Interaction): Promise<void> {
		const component = ShowImagesComponent.singleton;

		if (!interaction.inCachedGuild() || !interaction.isButton() || !component.match(interaction)) {
			return;
		}

		const replyedMessage = await this.service.fetchReplyedMessage(interaction.message);
		if (!replyedMessage || !this.service.isShowable(replyedMessage)) {
			await interaction.message.delete();
			return;
		}

		const payloads = this.service.makeReplyPayloads(replyedMessage, interaction.locale);
		await this.service.sendPayloads(interaction, payloads);
	}
}
