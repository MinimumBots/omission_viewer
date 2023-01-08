import { Logger } from '../common/Logger.js';
import { Service } from '../base/Service.js';

import type { Client, ClientEvents } from 'discord.js';

export abstract class Action<EventName extends keyof ClientEvents> {
	protected readonly abstract service: Service;

	public constructor(protected readonly bot: Client<true>) {
	}

	public execute(...args: ClientEvents[EventName]): void {
		const actionName = this.constructor.name;

		Logger.debug(`Start ${actionName}.`);

		this.call(...args)
			.then((response) => Logger.debug(actionName, 'responded:', response))
			.catch((error) => Logger.error(actionName, 'threw:', error))
			.finally(() => Logger.debug(`Finish ${actionName}.`));
	}

	protected abstract call(...args: ClientEvents[EventName]): Promise<object | null>;
}
