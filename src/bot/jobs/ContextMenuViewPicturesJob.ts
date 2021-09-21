import { ContextMenuInteraction, Message } from 'discord.js';
import { InteractionMessage, MessageTriggeredInteraction } from '../typings';
import { fetchMessage } from '../utilities';
import { ViewPicturesJob } from './ViewPicturesJob';

export class ContextMenuViewPictureJob extends ViewPicturesJob {
  constructor(private interaction: ContextMenuInteraction) {
    super();
  }

  async respond(): Promise<InteractionMessage[]> {
    return await this.sendImages(this.interaction);
  }

  protected async fetchTargetMessage(
    interaction: MessageTriggeredInteraction
  ): Promise<Message | null> {
    if (!interaction.isContextMenu()) return null;

    const channelId = this.getTriggerChannelId(interaction);
    if (!channelId) return null;

    return await fetchMessage(
      interaction.client, channelId, interaction.targetId
    ) ?? null;
  }
}
