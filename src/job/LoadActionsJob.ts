import { AttachConsoleAction } from '../action/AttachConsoleAction.js';
import { ShowImagesButtonAction } from '../action/ShowImagesButtonAction.js';
import { ShowImagesContextMenuAction } from '../action/ShowImagesContextMenuAction.js';

import type { Client } from 'discord.js';

export class LoadActionsJob {
	public static run(bot: Client<true>) {
		const attachConsoleAction = new AttachConsoleAction(bot);
		const showImagesContextMenuAction = new ShowImagesContextMenuAction(bot);
		const showImagesButtonAction = new ShowImagesButtonAction(bot);

		bot
			.on('messageCreate', (message) => attachConsoleAction.execute(message))
			.on('interactionCreate', (interaction) => {
				showImagesContextMenuAction.execute(interaction);
				showImagesButtonAction.execute(interaction);
			});
	}
}
