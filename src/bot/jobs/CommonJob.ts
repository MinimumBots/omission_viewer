import type { Snowflake } from 'discord.js';
import type {
  InteractionMessage,
  MessageTriggeredInteraction,
  ReplyableInteraction,
} from '../typings';

import { ContextMenuInteraction, Message, MessageComponentInteraction } from 'discord.js';

export abstract class CommonJob {
  abstract respond(): Promise<unknown>;

  protected getTriggerChannelId(
    interaction: MessageTriggeredInteraction,
  ): Snowflake | null {
    let message: InteractionMessage | null = null;

    if (interaction.channelId) return interaction.channelId;

    if (interaction instanceof ContextMenuInteraction) {
      if (interaction.targetType === 'MESSAGE')
        message = interaction.options.getMessage('message');
      else
        return null;
    }
    if (interaction instanceof MessageComponentInteraction)
      message = interaction.message;

    if (!message)
      return null;

    return message instanceof Message ? message.channelId : message.channel_id;
  }

  protected replyErrorMessage(
    interaction: ReplyableInteraction,
    content: string,
  ): Promise<InteractionMessage> {
    return interaction.reply({
      content: `⚠️ **${content}**`,
      ephemeral: true,
      fetchReply: true,
    });
  }
}
