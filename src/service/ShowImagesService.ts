import { hyperlink, MessageType } from 'discord.js';
import { ImagesCommonService } from './ImagesCommonService';
import { Translation } from '../common/Translation';
import { TranslateCode } from '../constant/TranslateCode';

import type { Message, RepliableInteraction } from 'discord.js';
import type { ImageUrlPair, ImageUrlsMap, ReplyPayload } from '../common/typing';

export class ShowImagesService extends ImagesCommonService {
	public async fetchReplyedMessage(message: Message<true>): Promise<Message<true> | null> {
		const referenceMessageId = message.reference?.messageId;

		if (!referenceMessageId || message.type !== MessageType.Reply) {
			return null;
		}

		return message.channel.messages.fetch(referenceMessageId);
	}

	public makeReplyPayloads(message: Message<true>): ReplyPayload[] {
		return this.convertToPayloads(this.collectImageUrlsMap(message));
	}

	public async sendPayloads(interaction: RepliableInteraction, payloads: ReplyPayload[]): Promise<void> {
		await interaction.reply(payloads[0]);
		await Promise.all(payloads.slice(1).map(interaction.followUp));
	}

	private convertToPayloads(imageUrlsMap: ImageUrlsMap): ReplyPayload[] {
		return [...imageUrlsMap].reduce(this.imageUrlsToPayload, new Array<ReplyPayload>());
	}

	private imageUrlsToPayload(payloads: ReplyPayload[], imageUrlPair: ImageUrlPair): ReplyPayload[] {
		const [siteUrl, imageUrls] = imageUrlPair;

		return payloads.concat({
			content: hyperlink(Translation.do(TranslateCode.L0000000), siteUrl),
			files: imageUrls,
			ephemeral: true,
			fetchReply: true,
		});
	}
}
