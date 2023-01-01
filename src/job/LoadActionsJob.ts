import { AttachConsoleAction } from '../action/AttachConsoleAction';
import { ShowImagesButtonAction } from '../action/ShowImagesButtonAction';
import { ShowImagesCommandAction } from '../action/ShowImagesCommandAction';

import type { Client } from 'discord.js';

export class LoadActionsJob {
	public static execute(bot: Client<true>) {
		bot
			.on('messageCreate', new AttachConsoleAction(bot).execute)
			.on('interactionCreate', new ShowImagesCommandAction(bot).execute)
			.on('interactionCreate', new ShowImagesButtonAction(bot).execute);
	}
}
