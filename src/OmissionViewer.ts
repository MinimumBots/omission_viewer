import { Client, Partials } from 'discord.js';
import { LoadActionsJob } from './job/LoadActionsJob.js';
import { Settings } from './common/Settings.js';

import type { ClientOptions } from 'discord.js';

export class OmissionViewer {
	private static readonly clientOptions: ClientOptions = {
		intents: ['Guilds', 'GuildMessages'],
		partials: [
			Partials.Channel,
			Partials.GuildMember,
			Partials.GuildScheduledEvent,
			Partials.Message,
			Partials.Reaction,
			Partials.ThreadMember,
			Partials.User,
		],
		presence: { activities: [{ name: Settings.presenceMessage }] },
	}

	private readonly bot = new Client(OmissionViewer.clientOptions);

	/**
	 * Wakeup the bot.
	 */
	public wakeup(): void {
		this.bot.on('ready', (bot) => this.initialize(bot));

		this.bot.login()
			.catch(console.error);

		process
			.on('SIGTERM', () => this.terminate())
			.on('SIGINT', () => this.terminate());
	}

	private initialize(bot: Client<true>): void {
		LoadActionsJob.run(bot);
	}

	/**
	 * Stop the bot safely.
	 */
	private terminate(): void {
		this.bot.destroy();
		process.exit(0);
	}
}
