import { Collection } from 'discord.js';
import { Service } from '../base/Service.js';

import type { Embed, Message, PartialMessage } from 'discord.js';

/**
 * Common service for embedded images.  
 */
export abstract class ImagesCommonService extends Service {
	/**
	 * Verifies if the embed contains more than one image.  
	 * @param message A target message.
	 * @returns Whether the embed contains more than one image.
	 */
	protected containsSomeImages(message: Message | PartialMessage): boolean {
		return this.collectImageUrlsMap(message)
			.some(urls => urls.length > 1);
	}

	/**
	 * Generates a list of image URLs associated with site URLs from embeds in a message.  
	 * @param message A source message.
	 * @returns A map of image URL lists, keyed by site URL.
	 */
	protected collectImageUrlsMap(message: Message | PartialMessage): Collection<string, string[]> {
		return message.embeds.reduce(
			(urlsMap, embed) => this.bindImageUrl(urlsMap, embed),
			new Collection<string, string[]>()
		);
	}

	/**
	 * Bind a image URL in a embed with a map's site URL.  
	 * If there is no site URL and image in a embed, do nothing.  
	 * (**Destructive**)
	 * @param urlsMap A image URL map.
	 * @param embed A embed.
	 * @returns A image URL map.
	 */
	private bindImageUrl(urlsMap: Collection<string, string[]>, embed: Embed): Collection<string, string[]> {
		return embed.url && embed.image
			? urlsMap.set(embed.url, (urlsMap.get(embed.url) ?? []).concat(embed.image.url))
			: urlsMap;
	}
}
