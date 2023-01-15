import type { Client } from 'discord.js';

export abstract class Service {
	public constructor(protected readonly bot: Client<true>) {
	}
}
