import { AttachConsoleAction } from '../action/AttachConsoleAction.js';
import { ShowImagesButtonAction } from '../action/ShowImagesButtonAction.js';
import { ShowImagesCommandAction } from '../action/ShowImagesCommandAction.js';

import type { Client } from 'discord.js';

export class LoadActionsJob {
	public static run(bot: Client<true>) {
		bot
			.on('messageCreate', new AttachConsoleAction(bot).execute)
			.on('interactionCreate', new ShowImagesCommandAction(bot).execute)
			.on('interactionCreate', new ShowImagesButtonAction(bot).execute);
	}
}
