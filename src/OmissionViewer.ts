import { Client, Partials } from 'discord.js';
import { LoadActionsJob } from './job/LoadActionsJob.js';
import { Logger } from './common/Logger.js';
import { Settings } from './common/Settings.js';
import { SyncGlobalCommandsJob } from './job/SyncGlobalCommandsJob.js';

import type { ClientOptions } from 'discord.js';

export class OmissionViewer {
	private static readonly clientOptions: ClientOptions = {
		intents: ['Guilds', 'GuildMessages', 'MessageContent'],
		partials: [
			Partials.Channel,
			Partials.GuildMember,
			Partials.GuildScheduledEvent,
			Partials.Message,
			Partials.Reaction,
			Partials.ThreadMember,
			Partials.User,
		],
		failIfNotExists: false,
		presence: { activities: [{ name: Settings.presenceMessage }] },
	}

	private readonly bot = new Client(OmissionViewer.clientOptions)
		.on('ready', async (bot) => await this.runJobs(bot))
		.on('shardReady', (shardId) => Logger.info(`No.${shardId} shard is ready.`))
		.on('debug', (debug) => Logger.debug(debug))
		.on('warn', (warn) => Logger.warn(warn))
		.on('error', (error) => Logger.error(error));

	/**
	 * Wakeup the bot.
	 */
	public wakeup(): void {
		this.bot.login()
			.catch((error) => Logger.error(error));

		process
			.on('SIGTERM', () => this.terminate())
			.on('SIGINT', () => this.terminate());
	}

	private async runJobs(bot: Client<true>): Promise<void> {
		await SyncGlobalCommandsJob.run(bot);
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
