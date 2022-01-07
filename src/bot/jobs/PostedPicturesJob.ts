import type { Snowflake, Client, Message } from 'discord.js';
import type { LaxMessage } from '../typings';

import { ButtonPrefixes } from '../constants';
import { ViewerRelatedJob } from './ViewerRelatedJob';

type ChannelId = Snowflake;
type MessageId = Snowflake;

export class PostedPicturesJob extends ViewerRelatedJob {
  static respondedMessageIds: Map<MessageId, ChannelId> = new Map();

  static sweepMessageIds(bot: Client<true>): void {
    const channels = bot.channels.cache;

    this.respondedMessageIds.forEach((messageId, channelId, messageIds) => {
      const channel = channels.get(channelId);
      if (!channel || !channel.isText()) return;

      if (!channel.messages.cache.has(messageId)) messageIds.delete(messageId);
    });
  }

  private static entryRespondedMessage(message: LaxMessage): Map<MessageId, ChannelId> {
    return this.respondedMessageIds.set(message.id, message.channelId);
  }

  constructor(
    private bot: Client<true>,
    private message: LaxMessage,
    private oldMessage?: LaxMessage,
  ) {
    super();
  }

  async respond(): Promise<Message | null> {
    const channel = this.message.channel;

    if (
      channel.type === 'DM'
      || !channel.permissionsFor(this.bot.user)?.has('SEND_MESSAGES')
      || PostedPicturesJob.respondedMessageIds.has(this.message.id)
      || this.oldMessage && this.containsSomePictures(this.oldMessage)
    ) return null;

    const imageURLsChunks = this.collectImageURLsChunks(this.message);
    if (!imageURLsChunks.some(urls => urls.length > 1)) return null;

    PostedPicturesJob.entryRespondedMessage(this.message);

    return await this.sendController(imageURLsChunks.flat().length);
  }

  private containsSomePictures(message: LaxMessage): boolean {
    return this.collectImageURLsChunks(message)
      .some(urls => urls.length - 1 > 0);
  }

  private async sendController(imageCount: number): Promise<Message> {
    const message = await this.message.fetch();

    return await message.reply({
      content: '表示されていない画像を表示します',
      components: [
        {
          type: 'ACTION_ROW',
          components: [
            {
              type: 'BUTTON',
              style: 'SUCCESS',
              label: `${imageCount} 枚の画像を表示`,
              customId: ButtonPrefixes.viewPictures,
            },
          ],
        },
      ],
      allowedMentions: { repliedUser: false },
    });
  }
}
