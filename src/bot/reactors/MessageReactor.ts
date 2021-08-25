import {
  Client,
  MessageActionRowOptions,
  Snowflake,
} from 'discord.js';

import { LaxMessage } from '../../constants';
import { removeMessageCache } from '../utilities';
import { ButtonReactor } from './ButtonReactor';
import { collectImageURLsChunks } from './generators';

export namespace MessageReactor {
  export function initialize(bot: Client) {
    bot.on('messageCreate', message => resolveMessage(message));
    bot.on(
      'messageUpdate',
      (oldMessage, message) => resolveUpdatedMessage(oldMessage, message)
    );
  }

  const respondedMessageIds: Set<Snowflake> = new Set();

  function resolveMessage(message: LaxMessage): void {
    if (countHiddenImages(message))
      sendController(message)
        .then(() => respondedMessageIds.add(message.id))
        .catch(console.error);
    else
      removeMessageCache(message);
  }

  function resolveUpdatedMessage(
    oldMessage: LaxMessage, message: LaxMessage
  ): void {
    if (!respondedMessageIds.has(message.id) && !countHiddenImages(oldMessage))
      resolveMessage(message);
  }

  function countHiddenImages(message: LaxMessage): number {
    return collectImageURLsChunks(message)
      .reduce((count, urls) => count + urls.length - 1, 0);
  }

  const controllerComponents: MessageActionRowOptions[] = [
    {
      type: 'ACTION_ROW',
      components: [
        {
          type: 'BUTTON',
          style: 'SUCCESS',
          label: 'すべての画像を表示',
          customId: ButtonReactor.prefixes.viewImages,
        },
      ],
    },
  ];

  async function sendController(laxMessage: LaxMessage): Promise<void> {
    const message = await laxMessage.fetch();

    await message.reply({
      content: 'このメッセージ内のすべての画像をチャンネルの一番下に表示します',
      components: controllerComponents,
      allowedMentions: { repliedUser: false },
    });
  }
}
