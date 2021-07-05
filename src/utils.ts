import { Client, Message, Snowflake } from 'discord.js';

export namespace Utils {
  export async function fetchMessage(
    bot: Client, channelID: Snowflake | string, messageID: Snowflake | string
  ): Promise<Message | undefined> {
    const channel = bot.channels.cache.get(`${BigInt(channelID)}`);
    if (!channel?.isText()) return;

    try {
      const message = await channel.messages.fetch(`${BigInt(messageID)}`);
      return message;
    }
    catch {
      return;
    }
  }

  export async function deleteMessage(
    bot: Client, channelID: Snowflake | string, messageID: Snowflake | string
  ): Promise<void> {
    const channel = bot.channels.cache.get(`${BigInt(channelID)}`);
    if (channel?.isText()) await channel.messages.delete(`${BigInt(messageID)}`);
  }
}
