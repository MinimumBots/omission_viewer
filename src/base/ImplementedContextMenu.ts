import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction, LocalizationMap } from 'discord.js';
import type { ImplementedCommand } from './ImplementedCommand.js';

export abstract class ImplementedContextMenu implements ImplementedCommand {
	protected abstract readonly name: string; 
	protected abstract readonly nameLocalizations: LocalizationMap;
	public abstract readonly builder: ContextMenuCommandBuilder;
	public abstract match(interaction: ContextMenuCommandInteraction): boolean;
}
