import {
  ButtonInteraction,
  Client,
  Interaction,
  Message,
  PartialMessage,
} from 'discord.js';
import { Utils } from '../../utils';

export namespace ImageViewer {
  export function initialize(bot: Client): void {
    bot.on('messageCreate', message => resolveMessage(message));
    bot.on('messageUpdate', (_, message) => resolveMessage(message));
    bot.on('interactionCreate', interaction => resolveButton(interaction));
  }

  type LaxMessage = Message | PartialMessage;

  function resolveMessage(message: LaxMessage): void {
    const imageURLs = collectChainImageURLs(message);
    if (!imageURLs.length) return;

    sendViewerMessage(message)
      .catch(console.error);
  }

  const prefixes = {
    viewImages: 'ViewImages',
    deleteSelf: 'DeleteSelf',
  };

  function resolveButton(interaction: Interaction): void {
    if (!interaction.isButton()) return;

    const { prefix, args } = Utils.parseCustomID(interaction.customID);

    if (prefix === prefixes.viewImages)
      sendViewImages(interaction, args)
        .catch(console.error);
    if (prefix === prefixes.deleteSelf)
      deleteViewerMessage(interaction, args)
        .catch(console.error);
  }

  const chainMax = 4; // Maximum of images in the embed.

  function collectChainImageURLs(message: LaxMessage): string[] {
    const embeds = message.embeds;
    const chain: string[] = [];
    const queue: string[] = [];
    let targetURL: string | null = null;

    embeds.forEach((embed, i) => {
      if (targetURL && targetURL === embed.url) {
        const imageURL = embed.image?.url;
        if (imageURL && queue.length < chainMax) queue.push(imageURL);
      }
      else {
        if (targetURL) {
          chain.push(...queue);
          queue.length = 0;
        }
        targetURL = embeds[i].url;
      }
    });

    return chain.concat(queue);
  }

  async function sendViewerMessage(laxMessage: LaxMessage): Promise<void> {
    const message = await laxMessage.fetch();

    await message.channel.send({
      content: '\u200B',
      components: [
        {
          type: 'ACTION_ROW',
          components: [
            {
              type: 'BUTTON',
              style: 'SUCCESS',
              label: '続きの画像を表示',
              customID: Utils.generateCustomID(
                prefixes.viewImages, [message.id]
              ),
            },
            {
              type: 'BUTTON',
              style: 'DANGER',
              label: '削除',
              customID: Utils.generateCustomID(
                prefixes.deleteSelf, [message.author.id]
              ),
            },
          ],
        },
      ],
    });
  }

  async function sendViewImages(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelID = interaction.channelID;
    if (!channelID) return failButtonInteraction(interaction);

    const message = await Utils.fetchMessage(
      interaction.client, channelID, args[0]
    );
    if (!message) return failButtonInteraction(interaction);

    const imageURLs = collectChainImageURLs(message);
    if (!imageURLs.length) return failButtonInteraction(interaction);

    return interaction.reply({
      ephemeral: true,
      embeds: imageURLs.map(url => ({ image: { url } })),
    });
  }

  function deleteViewerMessage(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelID = interaction.channelID;
    if (!channelID) return failButtonInteraction(interaction);

    if (interaction.user.id === args[0])
      return Utils.deleteMessage(
        interaction.client, channelID, interaction.message.id
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
