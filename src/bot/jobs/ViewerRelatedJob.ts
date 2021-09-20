import { MessageEmbed } from 'discord.js';
import { LaxMessage } from '../../typings';
import { CommonJob } from './CommonJob';

export abstract class ViewerRelatedJob extends CommonJob {
  protected collectImageURLsChunks(message: LaxMessage): string[][] {
    const embeds: (MessageEmbed | null)[] = message.embeds.slice();

    return message.embeds.reduce((chunks, targetEmbed, i) => {
      if (!embeds[i]) return chunks;

      const urls = embeds.reduce((urls, embed, i) => {
        if (!embed?.image || targetEmbed.url !== embed.url) return urls;

        embeds[i] = null;
        return urls.concat(embed.image.url);
      }, [] as string[]);

      return urls.length ? chunks.concat([urls]) : chunks;
    }, [] as string[][]);
  }
}
