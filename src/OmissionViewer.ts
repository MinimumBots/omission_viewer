import { Client, ClientOptions, Partials } from 'discord.js';
import { Settings } from './common/Settings';
import { LoadActionsJob } from './job/LoadActionsJob';

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
		this.bot.on('ready', this.initialize);

		this.bot.login()
			.catch(console.error);

		process
			.on('SIGTERM', this.terminate)
			.on('SIGINT', this.terminate);
	}

	private initialize(bot: Client<true>): void {
		LoadActionsJob.execute(bot);
	}

	/**
	 * Stop the bot safely.
	 */
	private terminate(): void {
		this.bot.destroy();
		process.exit(0);
	}
}
