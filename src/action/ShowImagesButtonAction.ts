import { Action } from '../base/Action.js';
import { ShowImagesComponent } from '../component/ShowImagesComponent.js';
import { ShowImagesService } from '../service/ShowImagesService.js';

import type { Interaction } from 'discord.js';

export class ShowImagesButtonAction extends Action<'interactionCreate'> {
	protected override readonly service = new ShowImagesService(this.bot);

	private readonly component = ShowImagesComponent.singleton;

	protected override async call(interaction: Interaction): Promise<void> {
		if (!interaction.inCachedGuild() || !interaction.isButton() || !this.component.match(interaction)) {
			return;
		}

		const replyedMessage = await this.service.fetchReplyedMessage(interaction.message);
		if (!replyedMessage) {
			await interaction.message.delete();
			return;
		}

		const payloads = this.service.makeReplyPayloads(replyedMessage);
		if (!payloads.length) {
			await interaction.message.delete();
			return;
		}

		await this.service.sendPayloads(interaction, payloads);
	}
}
