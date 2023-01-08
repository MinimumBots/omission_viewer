import { Singleton } from './Singleton.js';

import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction, LocalizationMap } from 'discord.js';

export abstract class ImplementedContextMenu extends Singleton {
	protected abstract readonly name: string; 
	protected abstract readonly nameLocalizations: LocalizationMap;
	public abstract readonly builder: ContextMenuCommandBuilder;
	public abstract match(interaction: ContextMenuCommandInteraction): boolean;
}
