import {
  BaseCommandInteraction,
  Client,
  Message,
  MessageComponentInteraction,
  Snowflake, 
} from 'discord.js';
import { LaxMessage } from '../constants';

export async function fetchMessage(
  bot: Client, channelId: Snowflake, messageId: Snowflake
): Promise<Message | undefined> {
  const channel = bot.channels.cache.get(channelId);
  if (!channel?.isText()) return;

  try {
    const message = await channel.messages.fetch(messageId);
    return message;
  }
  catch {
    return;
  }
}

export async function deleteMessage(
  bot: Client, channelId: Snowflake, messageId: Snowflake
): Promise<void> {
  const channel = bot.channels.cache.get(channelId);
  if (channel?.isText()) await channel.messages.delete(messageId);
}

export function removeMessageCache(message: LaxMessage): boolean {
  return message.channel.messages.cache.delete(message.id);
}

export function replyErrorMessage(
  interaction: MessageComponentInteraction | BaseCommandInteraction,
  content: string,
): Promise<void> {
  return interaction.reply({ content: `⚠️ **${content}**`, ephemeral: true });
}
