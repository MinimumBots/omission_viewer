import type { Client, ClientEvents } from 'discord.js';

import { ReportableError } from '../error/ReportableError.js';
import { ReportErrorAction } from './ReportErrorAction.js';
import { Service } from '../common/Service.js';

export abstract class Action<EventName extends keyof ClientEvents> {
	protected readonly bot: Client<true>;

	protected readonly abstract service: Service;

	public constructor(bot: Client<true>) {
		this.bot = bot;
	}

	public execute(...args: ClientEvents[EventName]): void {
		this.call(...args)
			.catch((error) => this.handleError(error));
	}

	protected abstract call(...args: ClientEvents[EventName]): Promise<void>;

	protected handleError(error: unknown): void {
		if (error instanceof ReportableError) {
			new ReportErrorAction(error).report()
				.catch(console.error);

			return;
		}

		if (error instanceof Error) {
			console.error(error.stack);
		}
	}
}
