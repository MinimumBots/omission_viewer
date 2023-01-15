import { ActionRowBuilder } from 'discord.js';
import { ImagesCommonService } from './ImagesCommonService.js';
import { ShowImagesComponent } from '../component/ShowImagesComponent.js';

import type { Message, MessageActionRowComponentBuilder, PartialMessage, Snowflake } from 'discord.js';

type ChannelId = Snowflake;
type MessageId = Snowflake;

export class AttachConsoleService extends ImagesCommonService {
	private static readonly attachedTargets: Map<MessageId, ChannelId> = new Map();

	public isAttachable(message: Message | PartialMessage): message is Message<true> {
		return !!(this.containsSomeImages(message)
			&& message.inGuild()
			&& message.channel.permissionsFor(this.bot.user)?.has('SendMessages'));
	}

	public isRevengeable(message: Message | PartialMessage, oldMessage: Message | PartialMessage): boolean {
		return !AttachConsoleService.attachedTargets.has(message.id)
			&& !this.containsSomeImages(oldMessage)
			&& message.channel.lastMessageId === message.id;
	}

	public attach(message: Message<true>): Promise<Message<true>> {
		const component = ShowImagesComponent.singleton;
		const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
			.addComponents(component.build(this.countImages(message), message.guild.preferredLocale));

		return message.reply({ components: [actionRow], allowedMentions: { repliedUser: false } });
	}

	private countImages(message: Message): number {
		return this.collectImageUrlsMap(message)
			.reduce((count, urls) => count + urls.length, 0);
	}
}
