import { Action } from './Action';
import { ActionRowBuilder } from 'discord.js';
import { AttachConsoleService } from '../service/AttachConsoleService';
import { ShowImagesComponent } from '../component/ShowImagesComponent';

import type { Message, MessageActionRowComponentBuilder } from 'discord.js';

export class AttachConsoleAction extends Action<'messageCreate'> {
	protected readonly service = new AttachConsoleService(this.bot);

	private readonly component = new ShowImagesComponent();

	protected async call(message: Message<true>): Promise<void> {
		if (!this.service.isAttachable(message)) {
			return;
		}

		await this.attach(message);
	}

	private attach(message: Message<true>): Promise<Message<true>> {
		const imageCount = this.service.countImages(message);
		const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
			.addComponents(this.component.build(imageCount, message.guild.preferredLocale));

		return message.reply({ components: [actionRow] });
	}
}
