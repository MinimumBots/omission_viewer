import { Collection } from 'discord.js';
import { Service } from './Service.js';

import type { Embed, Message, PartialMessage } from 'discord.js';
import type { ImageUrlPair, ImageUrlsMap } from '../common/typing.js';

/**
 * Common service for embedded images.  
 */
export abstract class ImagesCommonService extends Service {
	/**
	 * Generates a list of image URLs associated with site URLs from embeds in a message.  
	 * @param message A source message.
	 * @returns A map of image URL lists, keyed by site URL.
	 */
	protected collectImageUrlsMap(message: Message | PartialMessage): ImageUrlsMap {
		return message.embeds.reduce(this.bindImageUrl, new Collection<ImageUrlPair[0], ImageUrlPair[1]>());
	}

	/**
	 * Bind a image URL in a embed with a map's site URL.  
	 * If there is no site URL and image in a embed, do nothing.  
	 * (**Destructive**)
	 * @param urlsMap A image URL map.
	 * @param embed A embed.
	 * @returns A image URL map.
	 */
	private bindImageUrl(urlsMap: ImageUrlsMap, embed: Embed): ImageUrlsMap {
		return embed.url && embed.image
			? urlsMap.set(embed.url, (urlsMap.get(embed.url) ?? []).concat(embed.image.url))
			: urlsMap;
	}
}
