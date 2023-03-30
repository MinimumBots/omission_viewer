import { ActionRowBuilder, Snowflake } from 'discord.js';
import { ImagesCommonService } from './ImagesCommonService.js';
import { ShowImagesComponent } from '../component/ShowImagesComponent.js';

import type { Message, MessageActionRowComponentBuilder, PartialMessage } from 'discord.js';

export class AttachConsoleService extends ImagesCommonService {
	private static readonly processingMessages: Set<Snowflake> = new Set();

	public isAttachable(message: Message | PartialMessage): message is Message<true> {
		return !!(this.containsSomeImages(message)
			&& message.inGuild()
			&& message.channel.permissionsFor(this.bot.user)?.has('SendMessages'));
	}

	public isRevengeable(message: Message | PartialMessage, oldMessage: Message | PartialMessage): boolean {
		return !this.containsSomeImages(oldMessage)
			&& message.channel.lastMessageId === message.id;
	}

	public async attach(message: Message<true>): Promise<Message<true> | null> {
		if (!this.startProcessing(message)) {
			return null;
		}

		const component = ShowImagesComponent.singleton;
		const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
			.addComponents(component.build(this.countImages(message), message.guild.preferredLocale));

		const replyedMessage = await message.reply({ components: [actionRow], allowedMentions: { repliedUser: false } });

		this.finishProcessing(message);

		return replyedMessage;
	}

	private countImages(message: Message): number {
		return this.collectImageUrlsMap(message)
			.reduce((count, urls) => count + urls.length, 0);
	}

	private startProcessing(message: Message | PartialMessage): boolean {
		if (AttachConsoleService.processingMessages.has(message.id)) {
			return false;
		}

		AttachConsoleService.processingMessages.add(message.id);

		return true;
	}

	private finishProcessing(message: Message | PartialMessage): void {
		AttachConsoleService.processingMessages.delete(message.id);
	}
}
