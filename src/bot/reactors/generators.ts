import { MessageEmbed, MessageEmbedOptions } from 'discord.js';
import { LaxMessage } from '../../constants';

export function collectImageURLsChunks(message: LaxMessage): string[][] {
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

const imageEmbedColors: number[] = [
  0x00bb9f,
  0xf7503f,
  0x00cb7b,
  0xf38033,
  0x0097d6,
  0xf8c53f,
  0xa45ab1,
  0xfa2961,
];

const embedLengthMax = 10;

export function generateEmbedChunks(
  imageURLsChunks: string[][]
): MessageEmbedOptions[][] {
  return imageURLsChunks.reduce((chunks, urls, i) => {
    let lastChunk = chunks[chunks.length - 1];
    if (!lastChunk || lastChunk.length + urls.length > embedLengthMax)
      chunks.push(lastChunk = []);

    lastChunk.push(...urls.map((url, page) => ({
      color: imageEmbedColors[i],
      image: { url },
      footer: { text: `${page + 1}/${urls.length}` },
    })));

    return chunks;
  }, [] as MessageEmbedOptions[][]);
}
