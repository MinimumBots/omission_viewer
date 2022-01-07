import type { Message } from 'discord.js';
import type { ReplyableInteraction } from '../typings';

export abstract class CommonJob {
  abstract respond(): Promise<unknown>;

  protected replyErrorMessage(interaction: ReplyableInteraction<'cached'>, content: string): Promise<Message<true>> {
    return interaction.reply({
      content: `⚠️ **${content}**`,
      ephemeral: true,
      fetchReply: true,
    });
  }
}
