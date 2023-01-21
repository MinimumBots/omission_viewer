import { Client, Options, Partials } from 'discord.js';
import { LoadActionsJob } from './job/LoadActionsJob.js';
import { Logger } from './common/Logger.js';
import { Settings } from './common/Settings.js';
import { SyncGlobalCommandsJob } from './job/SyncGlobalCommandsJob.js';

import type { ClientOptions } from 'discord.js';

export class OmissionViewer {
	private readonly cacheFactory = Options.cacheWithLimits({
		MessageManager: 50,
	});

	private readonly clientOptions: ClientOptions = {
		makeCache: this.cacheFactory,
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
		intents: ['Guilds', 'GuildMessages', 'MessageContent'],
	}

	private readonly bot = new Client(this.clientOptions)
		.on('ready', async (bot) => await this.runJobs(bot))
		.on('ready', (bot) => Logger.info(`Fetched ${bot.guilds.cache.size} guilds, and ${bot.channels.cache.size} channels.`))
		.on('shardReady', (shardId) => Logger.info(`No.${shardId} shard turns ready.`))
		.on('shardResume', (shardId) => Logger.info(`No.${shardId} shard resumes successfully.`))
		.on('shardReconnecting', (shardId) => Logger.warn(`No.${shardId} shard is attempting to reconnect or re-identify.`))
		.on('shardDisconnect', (shardId) => Logger.fatal(`No.${shardId} shard's WebSocket disconnects and will no longer reconnect.`))
		.on('shardError', (error) => Logger.error(error))
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
			.on('SIGTERM', (signal) => this.terminate(signal))
			.on('SIGINT', (signal) => this.terminate(signal));
	}

	private async runJobs(bot: Client<true>): Promise<void> {
		await SyncGlobalCommandsJob.run(bot);
		LoadActionsJob.run(bot);
	}

	/**
	 * Stop the bot safely.
	 */
	private terminate(signal: NodeJS.Signals): void {
		Logger.warn(`A "${signal}" signal terminates the bot.`);

		this.bot.destroy();
		process.exit(0);
	}
}
