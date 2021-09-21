import { ButtonInteraction, Message } from 'discord.js';
import { InteractionMessage, MessageTriggeredInteraction } from '../typings';
import { fetchMessage } from '../utilities';
import { ViewPicturesJob } from './ViewPicturesJob';

export class ButtonViewPicturesJob extends ViewPicturesJob {
  constructor(private interaction: ButtonInteraction) {
    super();
  }

  async respond(): Promise<InteractionMessage[]> {
    return await this.sendImages(this.interaction);
  }

  protected async fetchTargetMessage(
    interaction: MessageTriggeredInteraction
  ): Promise<Message | null> {
    if (!interaction.isButton()) return null;

    const channelId = this.getTriggerChannelId(interaction);
    if (!channelId) return null;

    const triggerMessage = await fetchMessage(
      interaction.client, channelId, interaction.message.id
    );
    if (!triggerMessage) return null;

    const targetMessageId = triggerMessage.reference?.messageId;
    if (!targetMessageId) return null;

    return await fetchMessage(
      interaction.client, channelId, targetMessageId
    ) ?? null;
  }
}

