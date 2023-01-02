import { DiscordSnowflake } from '@sapphire/snowflake';
import { readFileSync } from 'fs';
import { ResourcePath } from '../constant/ResourcePath.js';
import YAML from 'yaml';

import type { ApplicationCommand, ApplicationCommandManager, Client, Collection } from 'discord.js';
import { CommandMap } from '../constant/CommandMap.js';

export class SyncGlobalCommandsJob {
	private static readonly commandResource = YAML.parse(readFileSync(ResourcePath.command, 'utf-8'));

	public static async run(bot: Client<true>) {
		const manager = bot.application.commands;
		const commands = await manager.fetch({ withLocalizations: true });

		const [removedCommands, existCommands] = commands.partition((commnad) => this.isRemoved(commnad));
		await Promise.all(this.remove(removedCommands));

		const updatedCommands = existCommands.filter((command) => this.isUpdated(command));
		await Promise.all(this.update(updatedCommands));

		const existCommandNames = existCommands.map((command) => command.name);
		const createdCommandNames = Object.keys(this.commandResource)
			.filter((commandName) => this.isCreated(commandName, existCommandNames));
		await Promise.all(this.create(manager, createdCommandNames))
	}

	private static isRemoved(command: ApplicationCommand): boolean {
		return !this.commandResource[command.name];
	}

	private static isUpdated(command: ApplicationCommand): boolean {
		return DiscordSnowflake.timestampFrom(command.version) < this.commandResource[command.name]['updatedTimestamp'];
	}

	private static isCreated(commandName: string, existCommandNames: string[] ): boolean {
		return !existCommandNames.includes(commandName);
	}

	private static remove(commands: Collection<string, ApplicationCommand>): Promise<void>[] {
		return commands.map((command) => this.removeCommand(command));
	}

	private static update(commands: Collection<string, ApplicationCommand>): Promise<void>[] {
		return commands.map((command) => this.editCommand(command));
	}

	private static create(manager: ApplicationCommandManager, commandNames: string[]): Promise<void>[] {
		return commandNames.map((commandName) => this.createCommand(manager, commandName));
	}

	private static async removeCommand(command: ApplicationCommand): Promise<void> {
		await command.delete();
	}

	private static async editCommand(command: ApplicationCommand): Promise<void> {
		const implementedCommand = CommandMap.get(command.name);
		if (implementedCommand === undefined) {
			return;
		}

		await command.edit(implementedCommand.builder);
	}

	private static async createCommand(manager: ApplicationCommandManager, commandName: string): Promise<void> {
		const implementedCommand = CommandMap.get(commandName);
		if (implementedCommand === undefined) {
			return;
		}

		await manager.create(implementedCommand.builder);
	}
}
