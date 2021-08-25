import {
  ButtonInteraction,
  Client,
  Interaction,
} from 'discord.js';

import { deleteMessage, fetchMessage, replyErrorMessage } from '../utilities';
import { collectImageURLsChunks, generateEmbedChunks } from './generators';

export namespace ButtonReactor {
  export function initialize(bot: Client): void {
    bot.on('interactionCreate', interaction => parse(interaction));
  }

  export const prefixes = {
    viewImages: 'ViewImages',
    deleteSelf: 'DeleteSelf',
  };

  const customIdSeparator = ',';

  // Will be removed in the next update.
  export function parseCustomId(customId: string): {
    prefix: string;
    args: string[];
  } {
    const splited = customId.split(customIdSeparator);
    return { prefix: splited[0], args: splited.slice(1) };
  }

  function parse(interaction: Interaction): void {
    if (!interaction.isButton()) return;

    const { prefix, args } = parseCustomId(interaction.customId);

    if (prefix === prefixes.viewImages)
      sendImages(interaction, args)
        .catch(console.error);
    if (prefix === prefixes.deleteSelf)
      deleteController(interaction, args)
        .catch(console.error);
  }

  // Will be removed 'args' in the next update.
  async function sendImages(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelId = interaction.channelId;
    if (!channelId) return failButtonInteraction(interaction);

    const targetMessage =  await fetchMessage(
      interaction.client, channelId, interaction.message.id
    );
    if (!targetMessage) return failButtonInteraction(interaction);

    const message = await fetchMessage(
      interaction.client,
      channelId,
      targetMessage.reference?.messageId ?? args[0],  
    );
    if (!message)
      return replyErrorMessage(interaction, '対象のメッセージが見つかりません');

    const imageURLsChunks = collectImageURLsChunks(message);
    if (!imageURLsChunks.length)
      return replyErrorMessage(interaction, '表示する画像が見つかりません');

    const embedsChunks = generateEmbedChunks(imageURLsChunks);

    Promise.all([
      interaction.reply({ embeds: embedsChunks[0], ephemeral: true }),
      embedsChunks.slice(1)
        .map(embeds => interaction.followUp({ embeds, ephemeral: true }))
    ]);
  }

  async function deleteController(
    interaction: ButtonInteraction, args: string[]
  ): Promise<void> {
    const channelId = interaction.channelId;
    if (!channelId) return failButtonInteraction(interaction);

    if (interaction.user.id === args[0])
      return deleteMessage(
        interaction.client, channelId, interaction.message.id
      );

    await replyErrorMessage(
      interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです'
    );
  }

  function failButtonInteraction(
    interaction: ButtonInteraction
  ): Promise<void> {
    return replyErrorMessage(interaction, '不明なエラーが発生しました');
  }
}
