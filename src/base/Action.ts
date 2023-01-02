import { Logger } from '../common/Logger.js';
import { Service } from '../common/Service.js';

import type { Client, ClientEvents } from 'discord.js';

export abstract class Action<EventName extends keyof ClientEvents> {
	protected readonly abstract startActionMessage: `Start ${string}.`;
	protected readonly abstract finishActionMessage: `Finish ${string}.`;

	protected readonly bot: Client<true>;

	protected readonly abstract service: Service;

	public constructor(bot: Client<true>) {
		this.bot = bot;
	}

	public execute(...args: ClientEvents[EventName]): void {
		Logger.debug(this.startActionMessage);

		this.call(...args)
			.catch((error) => Logger.error(error, args))
			.finally(() => Logger.debug(this.finishActionMessage));
	}

	protected abstract call(...args: ClientEvents[EventName]): Promise<void>;
}
