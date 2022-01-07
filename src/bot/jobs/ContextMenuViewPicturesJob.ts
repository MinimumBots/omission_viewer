import type { Message, MessageContextMenuInteraction } from 'discord.js';
import type { MessageTriggeredInteraction } from '../typings';

import { ViewPicturesJob } from './ViewPicturesJob';

export class ContextMenuViewPictureJob extends ViewPicturesJob {
  constructor(private interaction: MessageContextMenuInteraction<'cached'>) {
    super();
  }

  async respond(): Promise<Message<true>[]> {
    return await this.sendImages(this.interaction);
  }

  protected async fetchTargetMessage(interaction: MessageTriggeredInteraction<'cached'>): Promise<Message | null> {
    if (!interaction.isMessageContextMenu()) return null;
    return this.interaction.targetMessage;
  }
}
