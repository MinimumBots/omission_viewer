import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction, LocalizationMap } from 'discord.js';

export abstract class ImplementedContextMenu {
	protected abstract readonly name: string; 
	protected abstract readonly nameLocalizations: LocalizationMap;
	public abstract build(...args: any[]): ContextMenuCommandBuilder;
	public abstract match(interaction: ContextMenuCommandInteraction): boolean;
}
