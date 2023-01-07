import { Collection, hideLinkEmbed, hyperlink, MessageType } from 'discord.js';
import { ImagesCommonService } from './ImagesCommonService.js';
import { TranslateCode } from '../constant/TranslateCode.js';
import { Translate } from '../common/Translate.js';

import type { Message, RepliableInteraction } from 'discord.js';
import type { ReplyPayload } from '../common/typing';

export class ShowImagesService extends ImagesCommonService {
	public async fetchReplyedMessage(message: Message<true>): Promise<Message<true> | null> {
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

	public isShowable(message: Message<true>): boolean {
		return this.containsSomeImages(message);
	}

	public buildReplyPayloads(message: Message<true>, locale: string): ReplyPayload[] {
		return this.convertToPayloads(this.collectImageUrlsMap(message), locale);
	}

	public async sendPayloads(interaction: RepliableInteraction, payloads: ReplyPayload[]): Promise<void> {
		await interaction.reply(payloads[0]);
		await Promise.all(payloads.slice(1).map((payload) => interaction.followUp(payload)));
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
