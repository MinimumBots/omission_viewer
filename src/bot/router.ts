import {
  ApplicationCommandData,
  ButtonInteraction,
  Client,
  ContextMenuInteraction,
  Interaction,
} from 'discord.js';
import { ButtonPrefixes, CommandNames } from './constants';
import { LaxMessage } from '../typings';
import { ButtonViewPicturesJob } from './jobs/ButtonViewPicturesJob';
import { CommonJob } from './jobs/CommonJob';
import { PostedPicturesJob } from './jobs/PostedPicturesJob';
import { ContextMenuViewPictureJob } from './jobs/ContextMenuViewPicturesJob';
import { RemoveControllerJob } from './jobs/RemoveControllerJob';

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

export function setupJobs(bot: Client): void {
  bot.application?.commands.set(commandData)
    .catch(console.error);

  bot.on('messageCreate', message => routeMessage(message));
  bot.on('messageUpdate', (oldMessage, message) => routeMessage(message, oldMessage));
  bot.on('interactionCreate', interaction => routeInteraction(interaction));
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
