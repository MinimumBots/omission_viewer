import { Logger } from '../common/Logger.js';
import { Service } from '../base/Service.js';

import type { Client, ClientEvents } from 'discord.js';

export abstract class Action<EventName extends keyof ClientEvents> {
	protected readonly abstract service: Service;

	protected readonly abstract startActionMessage: `Start ${string}.`;
	protected readonly abstract finishActionMessage: `Finish ${string}.`;

	public constructor(protected readonly bot: Client<true>) {
	}

	public execute(...args: ClientEvents[EventName]): void {
		Logger.debug(this.startActionMessage);

		this.call(...args)
			.then((response) => Logger.debug(response))
			.catch((error) => Logger.error(error, args))
			.finally(() => Logger.debug(this.finishActionMessage));
	}

	protected abstract call(...args: ClientEvents[EventName]): Promise<object | null>;
}
