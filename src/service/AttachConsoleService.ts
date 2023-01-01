import { ImagesCommonService } from './ImagesCommonService';

import type { Message, PartialMessage, Snowflake } from 'discord.js';

type ChannelId = Snowflake;
type MessageId = Snowflake;

export class AttachConsoleService extends ImagesCommonService {
	private static readonly attachedTargets: Map<MessageId, ChannelId> = new Map();

	public isAttachable(message: Message | PartialMessage): message is Message<true> {
		return !!(message.inGuild()
			&& message.channel.permissionsFor(this.bot.user)?.has('SendMessages'));
	}

	public isRevengeable(message: Message<true>, oldMessage: Message | PartialMessage): boolean {
		return !AttachConsoleService.attachedTargets.has(message.id)
			&& !!(message.editedAt && message.channel.lastMessageId === message.id)
			&& !this.containsSomeImages(oldMessage)
	}

	public countImages(message: Message<true>): number {
		return this.collectImageUrlsMap(message)
			.reduce((count, urls) => count + urls.length, 0);
	}

	private containsSomeImages(message: Message | PartialMessage): boolean {
		return this.collectImageUrlsMap(message)
			.some(urls => urls.length > 1);
	}
}
