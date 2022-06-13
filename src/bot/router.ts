import type {
  ApplicationCommandData,
  ButtonInteraction,
  Client,
  Interaction,
  MessageContextMenuInteraction,
} from 'discord.js';
import type { LaxMessage } from './typings';

import { ButtonPrefixes, CommandNames } from './constants';
import { ButtonViewPicturesJob } from './jobs/ButtonViewPicturesJob';
import { CommonJob } from './jobs/CommonJob';
import { PostedPicturesJob } from './jobs/PostedPicturesJob';
import { ContextMenuViewPictureJob } from './jobs/ContextMenuViewPicturesJob';
import { RemoveControllerJob } from './jobs/RemoveControllerJob';

export function setupJobs(bot: Client<true>): void {
  syncCommands(bot);
  PostedPicturesJob.sweepMessageIds(bot);

  bot
    .on('messageCreate', (message) => routeMessage(bot, message))
    .on('messageUpdate', (oldMessage, message) => routeMessage(bot, message, oldMessage))
    .on('interactionCreate', (interaction) => routeInteraction(interaction));
}

const commandData: ApplicationCommandData[] = [
  {
    name: CommandNames.viewPictures,
    type: 'MESSAGE',
  },
  {
    name: CommandNames.removeController,
    type: 'MESSAGE',
  },
];

function syncCommands(bot: Client<true>): void {
  if (bot.shard && !bot.shard.ids.some(id => id === 0)) return;

  bot.application.commands.set(commandData)
    .catch(console.error);
}

function routeMessage(bot: Client<true>, message: LaxMessage, oldMessage?: LaxMessage): void {
  const job = new PostedPicturesJob(bot, message, oldMessage);

  job.respond()
    .catch(console.error);
}

function routeInteraction(interaction: Interaction): void {
  if (!interaction.inCachedGuild()) return;

  if (interaction.isButton())
    routeButtonInteraction(interaction);
  if (interaction.isMessageContextMenu())
    routeMessageContextMenuInteraction(interaction);
}

function routeButtonInteraction(interaction: ButtonInteraction<'cached'>): void {
  const customId = interaction.customId;
  let job: CommonJob | null = null;

  if (customId === ButtonPrefixes.viewPictures) job = new ButtonViewPicturesJob(interaction);

  job?.respond()
    .catch(console.error);
}

function routeMessageContextMenuInteraction(interaction: MessageContextMenuInteraction<'cached'>): void {
  const commandName = interaction.commandName;
  let job: CommonJob | null = null;

  if (commandName === CommandNames.viewPictures)
    job = new ContextMenuViewPictureJob(interaction);
  if (commandName === CommandNames.removeController)
    job = new RemoveControllerJob(interaction);

  job?.respond()
    .catch(console.error);
}
