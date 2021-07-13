import {
  ButtonInteraction,
  Client,
  Interaction,
  MessageEmbed,
  MessageEmbedOptions,
  Snowflake,
} from 'discord.js';
import { LaxMessage } from '../../constants';
import { Utils } from '../../utils';

export namespace ImageViewer {
  export function initialize(bot: Client): void {
    bot.on('messageCreate', message => resolveMessage(message));
    bot.on('messageUpdate', (_, message) => resolveUpdatedMessage(message));

    bot.on('interactionCreate', interaction => resolveButton(interaction));
  }

  const responsedMessageIds: Set<Snowflake> = new Set;

  function resolveMessage(message: LaxMessage): void {
    if (countHiddenImages(message))
      sendViewerMessage(message)
        .then(() => responsedMessageIds.add(message.id))
        .catch(console.error);
    else
      Utils.removeMessageCache(message);
  }

  function resolveUpdatedMessage(message: LaxMessage): void {
    if (!responsedMessageIds.has(message.id)) resolveMessage(message);
  }

  const prefixes = {
    viewImages: 'ViewImages',
    deleteSelf: 'DeleteSelf',
  };

  function resolveButton(interaction: Interaction): void {
    if (!interaction.isButton()) return;

    const { prefix, args } = Utils.parseCustomId(interaction.customId);

    if (prefix === prefixes.viewImages)
      sendViewImages(interaction, args)
        .catch(console.error);
    if (prefix === prefixes.deleteSelf)
      deleteViewerMessage(interaction, args)
        .catch(console.error);
  }

  function countHiddenImages(message: LaxMessage): number {
    return collectImageURLsChunks(message)
      .reduce((count, urls) => count + urls.length - 1, 0);
  }

  function collectImageURLsChunks(message: LaxMessage): string[][] {
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

  async function sendViewerMessage(laxMessage: LaxMessage): Promise<void> {
    const message = await laxMessage.fetch();

    await message.channel.send({
      content: '画像はこのチャンネルの一番下に表示されます',
      components: [
        {
          type: 'ACTION_ROW',
          components: [
            {
              type: 'BUTTON',
              style: 'SUCCESS',
              label: 'すべての画像を表示',
              customId: Utils.generateCustomId(
                prefixes.viewImages, [message.id]
              ),
            },
            {
              type: 'BUTTON',
              style: 'DANGER',
              label: '削除',
              customId: Utils.generateCustomId(
                prefixes.deleteSelf, [message.author.id]
              ),
            },
          ],
        },
      ],
    });
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

  async function sendViewImages(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelId = interaction.channelId;
    if (!channelId) return failButtonInteraction(interaction);

    const message = await Utils.fetchMessage(
      interaction.client, channelId, args[0]
    );
    if (!message)
      return interaction.reply({
        ephemeral: true,
        content: '⚠️ **対象のメッセージが見つかりません**',
      });

    const imageURLsChunks = collectImageURLsChunks(message)
    if (!imageURLsChunks.length)
      return interaction.reply({
        ephemeral: true,
        content: '⚠️ **表示する画像が見つかりません**',
      });

    const embedsChunks = imageURLsChunks.reduce((chunks, urls, i) => {
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

    await interaction.reply({ ephemeral: true, embeds: embedsChunks[0] });
    await Promise.all(
      embedsChunks.slice(1)
        .map(embeds => interaction.followUp({ ephemeral: true, embeds }))
    );
  }

  function deleteViewerMessage(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelId = interaction.channelId;
    if (!channelId) return failButtonInteraction(interaction);

    if (interaction.user.id === args[0])
      return Utils.deleteMessage(
        interaction.client, channelId, interaction.message.id
      );

    return interaction.reply({
      ephemeral: true,
      content: '⚠️ **このメッセージを削除できるのはメッセージの投稿者のみです**',
    });
  }

  function failButtonInteraction(
    interaction: ButtonInteraction
  ): Promise<void> {
    return interaction.reply({
      ephemeral: true,
      content: '⚠️ **不明なエラーが発生しました**',
    });
  }
}
