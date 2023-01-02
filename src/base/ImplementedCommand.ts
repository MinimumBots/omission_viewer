import type { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';
import { Singleton } from './Singleton.js';

export abstract class ImplementedCommand extends Singleton {
	public abstract readonly builder: SlashCommandBuilder | ContextMenuCommandBuilder;
}
