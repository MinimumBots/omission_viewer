import type { ButtonInteraction, Message } from 'discord.js';
import type { MessageTriggeredInteraction } from '../typings';

import { fetchMessage } from '../utilities';
import { ViewPicturesJob } from './ViewPicturesJob';

export class ButtonViewPicturesJob extends ViewPicturesJob {
  constructor(private interaction: ButtonInteraction<'cached'>) {
    super();
  }

  async respond(): Promise<Message<true>[]> {
    return await this.sendImages(this.interaction);
  }

  protected async fetchTargetMessage(interaction: MessageTriggeredInteraction<'cached'>): Promise<Message | null> {
    if (!interaction.isButton()) return null;

    const triggerMessage = interaction.message;
    if (!triggerMessage) return null;

    const targetMessageId = triggerMessage.reference?.messageId;
    if (!targetMessageId) return null;

    return await fetchMessage(interaction.client, triggerMessage.channelId, targetMessageId) ?? null;
  }
}
