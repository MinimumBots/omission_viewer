import type { Message, MessageContextMenuInteraction } from 'discord.js';

import { deleteMessage, fetchMessage } from '../utilities';
import { ViewerRelatedJob } from './ViewerRelatedJob';

export class RemoveControllerJob extends ViewerRelatedJob {
  constructor(private interaction: MessageContextMenuInteraction<'cached'>) {
    super();
  }

  async respond(): Promise<Message<true> | null> {
    const message = await this.fetchTargetMessage(this.interaction);
    if (!message)
      return this.replyErrorMessage(
        this.interaction, 'メッセージが見つかりませんでした'
      );

    if (message.author.id !== message.client.user?.id)
      return this.replyErrorMessage(
        this.interaction, '操作ボタン以外は削除できません'
      );

    const reference = await this.fetchReferenceMessage(message);

    if (reference && this.interaction.user.id !== reference.author.id)
      return this.replyErrorMessage(
        this.interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです'
      );

    await this.deleteController();

    return null;
  }

  private async fetchTargetMessage(interaction: MessageContextMenuInteraction<'cached'>): Promise<Message | null> {
    if (!interaction.isMessageContextMenu()) return null;

    const message = this.interaction.targetMessage;

    return await fetchMessage(message.client, message.channelId, message.id) ?? null;
  }

  private async fetchReferenceMessage(message: Message): Promise<Message | null> {
    const reference = message.reference;
    if (!reference || !reference.messageId) return null;

    return fetchMessage(
      message.client,
      message.channelId,
      reference.messageId,
    );
  }

  private async deleteController(): Promise<void> {
    await this.interaction.deferReply();
    await deleteMessage(
      this.interaction.client,
      this.interaction.channelId,
      this.interaction.targetId
    );
    await this.interaction.deleteReply();
  }
}
