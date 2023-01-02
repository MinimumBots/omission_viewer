import { DiscordSnowflake } from '@sapphire/snowflake';
import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath.js';
import YAML from 'yaml';

import type { ApplicationCommand, Client, Collection } from 'discord.js';
import { CommandMap } from '../constant/CommandMap.js';

export class SyncGlobalCommandsJob {
	private static readonly metadata = YAML.parse(readFileSync(ResourcePath.command, 'utf-8'));

	public static run(bot: Client<true>) {
		bot.application.commands.fetch({ withLocalizations: true })
			.then((commandMap) => this.sync(commandMap))
			.catch(console.error);
	}

	private static sync(commandMap: Collection<string, ApplicationCommand>): void {
		const syncingCommands = commandMap
			.filter((command) => this.isUpdated(command))
			.map((command) => this.editCommand(command));

		Promise.all(syncingCommands)
			.catch(console.error);
	}

	private static isUpdated(command: ApplicationCommand): boolean {
		return DiscordSnowflake.timestampFrom(command.version) < this.metadata[command.name]['updatedTimestamp'];
	}

	private static async editCommand(command: ApplicationCommand) {
		const implementedCommand = CommandMap.get(command.name);
		if (implementedCommand === undefined) {
			return;
		}

		await command.edit(implementedCommand.builder);
	}
}
