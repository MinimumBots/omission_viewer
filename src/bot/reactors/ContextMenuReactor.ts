import {
  ApplicationCommandData,
  Client,
  ContextMenuInteraction,
  Interaction,
} from 'discord.js';
import { deleteMessage, fetchMessage, replyErrorMessage } from '../utilities';
import { collectImageURLsChunks, generateEmbedChunks } from './generators';

export namespace ContextMenuReactor {
  export const commandNames = {
    viewImages: 'すべての画像を表示',
    deleteSelf: '操作ボタンを削除',
  };

  const commandData: ApplicationCommandData[] = [
    {
      name: commandNames.viewImages,
      type: 'MESSAGE',
    },
    {
      name: commandNames.deleteSelf,
      type: 'MESSAGE',
    },
  ];

  export function initialize(bot: Client): void {
    bot.application?.commands.set(commandData)
      .catch(console.error);

    bot.on('interactionCreate', interaction => parse(interaction));
  }

  function parse(interaction: Interaction): void {
    if (!interaction.isContextMenu() || interaction.targetType !== 'MESSAGE')
      return;

    if (interaction.commandName === commandNames.viewImages)
      sendImages(interaction)
        .catch(console.error);
    if (interaction.commandName === commandNames.deleteSelf)
      deleteController(interaction)
        .catch(console.error);
  }

  async function sendImages(interaction: ContextMenuInteraction) {
    const message = await fetchMessage(
      interaction.client, interaction.channelId, interaction.targetId
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
    interaction: ContextMenuInteraction
  ): Promise<void> {
    const message = await fetchMessage(
      interaction.client, interaction.channelId, interaction.targetId
    );
    if (!message)
      return replyErrorMessage(interaction, '不明なエラーが発生しました');

    if (message.author.id !== interaction.client.user?.id)
      return replyErrorMessage(interaction, '操作ボタン以外は削除できません');

    const referenceMessage = await fetchMessage(
      interaction.client,
      interaction.channelId,
      message.reference?.messageId ?? '',
    );

    if (referenceMessage && interaction.user.id !== referenceMessage.author.id)
      return replyErrorMessage(
        interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです'
      );

    await interaction.deferReply();
    await deleteMessage(
      interaction.client, interaction.channelId, interaction.targetId
    );
    await interaction.deleteReply();
  }
}
