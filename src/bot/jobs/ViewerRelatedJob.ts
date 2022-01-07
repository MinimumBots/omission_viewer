import type { MessageEmbed } from 'discord.js';
import type { LaxMessage } from '../typings';

import { Collection } from 'discord.js';
import { CommonJob } from './CommonJob';

export type ImageURLsMap = Collection<string, string[]>;

export abstract class ViewerRelatedJob extends CommonJob {
  protected collectImageURLsMap(message: LaxMessage): ImageURLsMap {
    const map: ImageURLsMap = new Collection();

    message.embeds.forEach(embed => {
      if (!embed.url || !embed.image) return;

      const imageURLs = map.get(embed.url) ?? [];
      map.set(embed.url, imageURLs.concat(embed.image.url));
    });

    return map;
  }
}
