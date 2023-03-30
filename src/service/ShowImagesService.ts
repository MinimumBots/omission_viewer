import { hideLinkEmbed, hyperlink, MessageType } from 'discord.js';
import { ImagesCommonService } from './ImagesCommonService.js';
import { TranslateCode } from '../constant/TranslateCode.js';
import { Translate } from '../common/Translate.js';

import type { Collection, Message, RepliableInteraction } from 'discord.js';
import type { ReplyPayload } from '../constant/typing';

export class ShowImagesService extends ImagesCommonService {
	public async fetchReplyedMessage(message: Message): Promise<Message | null> {
		const referenceMessageId = message.reference?.messageId;

		if (!referenceMessageId || message.type !== MessageType.Reply) {
			return null;
		}

		try {
			return await message.channel.messages.fetch({ message: referenceMessageId });
		} catch {
			return null;
		}
	}

	public isShowable(message: Message): boolean {
		return this.containsSomeImages(message);
	}

	public buildReplyPayloads(message: Message, locale: string): ReplyPayload[] {
		return this.convertToPayloads(this.collectImageUrlsMap(message), locale);
	}

	public async sendPayloads(interaction: RepliableInteraction, payloads: ReplyPayload[]): Promise<Message[]> {
		const messages: Message[] = [];

		messages.push(await interaction.reply(payloads[0]));

		for (const payload of payloads.slice(1)) {
			messages.push(await interaction.followUp(payload));
		}

		return messages;
	}

	private convertToPayloads(imageUrlsMap: Collection<string, string[]>, locale: string): ReplyPayload[] {
		return imageUrlsMap.reduce(
			(payloads, imageUrls, siteUrl) => this.imageUrlsToPayload(payloads, siteUrl, imageUrls, locale),
			new Array<ReplyPayload>()
		);
	}

	private imageUrlsToPayload(payloads: ReplyPayload[], siteUrl: string, imageUrls: string[], locale: string): ReplyPayload[] {
		return payloads.concat({
			content: this.buildContent(siteUrl, imageUrls, locale),
			ephemeral: true,
			fetchReply: true,
		});
	}

	private buildContent(siteUrl: string, imageUrls: string[], locale: string): string {
		const siteLink = hyperlink(Translate.do(TranslateCode.MSG00001, {}, locale), hideLinkEmbed(siteUrl));
		const imageLinks = imageUrls.map((imageUrl) => hyperlink('\u200C', imageUrl));

		return [siteLink, ...imageLinks].join(' ');
	}
}
