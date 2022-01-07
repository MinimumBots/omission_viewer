import type {
  Client,
  Message,
  Snowflake, 
} from 'discord.js';
import type { LaxMessage } from './typings';

export async function fetchMessage(bot: Client, channelId: Snowflake, messageId: Snowflake): Promise<Message | null> {
  const channel = bot.channels.cache.get(channelId);
  if (!channel?.isText()) return null;

  try {
    const message = await channel.messages.fetch(messageId);
    return message;
  }
  catch {
    return null;
  }
}

export async function deleteMessage(bot: Client, channelId: Snowflake, messageId: Snowflake): Promise<void> {
  const channel = bot.channels.cache.get(channelId);
  if (channel?.isText()) await channel.messages.delete(messageId);
}

export function removeMessageCache(message: LaxMessage): boolean {
  return message.channel.messages.cache.delete(message.id);
}
