import type { ComponentBuilder, MessageComponentInteraction } from 'discord.js';
import { Singleton } from './Singleton.js';

export abstract class ImplementedComponent extends Singleton {
	protected abstract readonly customId: string; 
	public abstract build(...args: any[]): ComponentBuilder;
	public abstract match(interaction: MessageComponentInteraction): boolean;
}
