import { Singleton } from './Singleton.js';

import type { ComponentBuilder, MessageComponentInteraction } from 'discord.js';

export abstract class ImplementedComponent extends Singleton {
	protected abstract readonly customId: string; 
	public abstract build(...args: any[]): ComponentBuilder;
	public abstract match(interaction: MessageComponentInteraction): boolean;
}
