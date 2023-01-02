import { AttachConsoleAction } from '../action/AttachConsoleAction.js';
import { AttachConsoleRevengeAction } from '../action/AttachConsoleRevengeAction.js';
import { ShowImagesButtonAction } from '../action/ShowImagesButtonAction.js';
import { ShowImagesContextMenuAction } from '../action/ShowImagesContextMenuAction.js';

import type { Action } from '../base/Action.js';
import type { Client, ClientEvents } from 'discord.js';

export class LoadActionsJob {
	public static run(bot: Client<true>) {
		this.entry(bot, 'messageCreate', [
			new AttachConsoleAction(bot),
		]);

		this.entry(bot, 'messageUpdate', [
			new AttachConsoleRevengeAction(bot),
		]);

		this.entry(bot, 'interactionCreate', [
			new ShowImagesContextMenuAction(bot),
			new ShowImagesButtonAction(bot),
		]);
	}

	private static entry<EventName extends keyof ClientEvents>(bot: Client<true>, eventName: EventName, actions: Action<EventName>[]) {
		bot.on(eventName, (...args) => actions.forEach((action) => action.execute(...args)));
	}
}
