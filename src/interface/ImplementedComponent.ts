import type { ComponentBuilder, MessageComponentInteraction } from 'discord.js';

export abstract class ImplementedComponent {
	protected abstract readonly customId: string; 
	public abstract build(...args: any[]): ComponentBuilder;
	public abstract match(interaction: MessageComponentInteraction): boolean;
}
