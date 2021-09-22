import { Snowflake, Client, Message } from 'discord.js';
import { ButtonPrefixes } from '../constants';
import { LaxMessage } from '../typings';
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
      || !this.containsSomePictures(this.message)
    ) return null;

    PostedPicturesJob.entryRespondedMessage(this.message);

    return await this.sendController();
  }

  private containsSomePictures(message: LaxMessage): boolean {
    return this.collectImageURLsChunks(message)
      .some(urls => urls.length - 1 > 0);
  }

  private async sendController(): Promise<Message> {
    const message = await this.message.fetch();

    return await message.reply({
      content: 'このメッセージ内のすべての画像をチャンネルの一番下に表示します',
      components: [
        {
          type: 'ACTION_ROW',
          components: [
            {
              type: 'BUTTON',
              style: 'SUCCESS',
              label: 'すべての画像を表示',
              customId: ButtonPrefixes.viewPictures,
            },
          ],
        },
      ],
      allowedMentions: { repliedUser: false },
    });
  }
}
