import {
  ApplicationCommandData,
  ButtonInteraction,
  Client,
  ContextMenuInteraction,
  Interaction,
} from 'discord.js';
import { ButtonPrefixes, CommandNames } from './constants';
import { LaxMessage } from './typings';
import { ButtonViewPicturesJob } from './jobs/ButtonViewPicturesJob';
import { CommonJob } from './jobs/CommonJob';
import { PostedPicturesJob } from './jobs/PostedPicturesJob';
import { ContextMenuViewPictureJob } from './jobs/ContextMenuViewPicturesJob';
import { RemoveControllerJob } from './jobs/RemoveControllerJob';

export function setupJobs(bot: Client): void {
  syncCommands(bot);

  bot.on('messageCreate', message => routeMessage(message));
  bot.on('messageUpdate', (oldMessage, message) => routeMessage(message, oldMessage));
  bot.on('interactionCreate', interaction => routeInteraction(interaction));
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

function syncCommands(bot: Client): void {
  if (bot.shard && !bot.shard.ids.some(id => id === 0)) return;

  bot.application?.commands.set(commandData)
    .catch(console.error);
}

function routeMessage(message: LaxMessage, oldMessage?: LaxMessage): void {
  const job = new PostedPicturesJob(message, oldMessage);

  job.respond()
    .catch(console.error);
}

function routeInteraction(interaction: Interaction): void {
  if (interaction.isButton())
    routeButtonInteraction(interaction);
  if (interaction.isContextMenu())
    routeContextMenuInteraction(interaction);
}

function routeButtonInteraction(interaction: ButtonInteraction): void {
  const customId = interaction.customId;
  let job: CommonJob | null = null;

  if (customId === ButtonPrefixes.viewPictures)
    job = new ButtonViewPicturesJob(interaction);
  if (customId.startsWith(ButtonPrefixes.viewImages))   // Will be removed in the next update.
    job = new ButtonViewPicturesJob(interaction);

  job?.respond()
    .catch(console.error);
}

function routeContextMenuInteraction(interaction: ContextMenuInteraction): void {
  const commandName = interaction.commandName;
  let job: CommonJob | null = null;

  if (commandName === CommandNames.viewPictures)
    job = new ContextMenuViewPictureJob(interaction);
  if (commandName === CommandNames.removeController)
    job = new RemoveControllerJob(interaction);

  job?.respond()
    .catch(console.error);
}
