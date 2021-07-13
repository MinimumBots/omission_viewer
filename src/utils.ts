import { Client, Message, Snowflake } from 'discord.js';
import { LaxMessage } from './constants';

export namespace Utils {
  export async function fetchMessage(
    bot: Client, channelId: Snowflake | string, messageId: Snowflake | string
  ): Promise<Message | undefined> {
    const channel = bot.channels.cache.get(`${BigInt(channelId)}`);
    if (!channel?.isText()) return;

    try {
      const message = await channel.messages.fetch(`${BigInt(messageId)}`);
      return message;
    }
    catch {
      return;
    }
  }

  export async function deleteMessage(
    bot: Client, channelId: Snowflake | string, messageId: Snowflake | string
  ): Promise<void> {
    const channel = bot.channels.cache.get(`${BigInt(channelId)}`);
    if (channel?.isText()) await channel.messages.delete(`${BigInt(messageId)}`);
  }

  export function removeMessageCache(message: LaxMessage): boolean {
    return message.channel.messages.cache.delete(message.id);
  }

  const customIdSeparator = ',';

  export function generateCustomId(prefix: string, args: string[]): string {
    return [prefix, ...args].join(customIdSeparator);
  }

  interface ParsedCustomId {
    prefix: string;
    args: string[];
  }

  export function parseCustomId(customId: string): ParsedCustomId {
    const splited = customId.split(customIdSeparator);
    return { prefix: splited[0], args: splited.slice(1) };
  }
}
