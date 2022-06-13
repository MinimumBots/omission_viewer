import type { LaxMessage } from '../typings';

import { Collection } from 'discord.js';
import { CommonJob } from './CommonJob';

export type ImageUrlsMap = Collection<string, string[]>;

export abstract class ViewerRelatedJob extends CommonJob {
  protected collectImageUrlsMap(message: LaxMessage): ImageUrlsMap {
    const map: ImageUrlsMap = new Collection();

    message.embeds.forEach(embed => {
      if (!embed.url || !embed.image) return;

      const imageURLs = map.get(embed.url) ?? [];
      map.set(embed.url, imageURLs.concat(embed.image.url));
    });

    return map;
  }
}
