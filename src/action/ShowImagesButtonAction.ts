import { InteractionAction } from '../base/InteractionAction.js';
import { ShowImagesComponent } from '../component/ShowImagesComponent.js';
import { ShowImagesService } from '../service/ShowImagesService.js';

import type { Interaction } from 'discord.js';

export class ShowImagesButtonAction extends InteractionAction {
	protected override readonly service = new ShowImagesService(this.bot);

	protected override async process(interaction: Interaction): Promise<object | null> {
		const component = ShowImagesComponent.singleton;

		if (!interaction.inCachedGuild() || !interaction.isButton() || !component.match(interaction)) {
			return null;
		}

		const replyedMessage = await this.service.fetchReplyedMessage(interaction.message);
		if (!replyedMessage || !this.service.isShowable(replyedMessage)) {
			await interaction.message.delete();
			return null;
		}

		const payloads = this.service.buildReplyPayloads(replyedMessage, interaction.locale);
		return this.service.sendPayloads(interaction, payloads);
	}
}
