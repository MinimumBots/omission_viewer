import { Logger } from '../common/Logger.js';
import { Service } from '../base/Service.js';

import type { Client, ClientEvents } from 'discord.js';

export abstract class Action<EventName extends keyof ClientEvents> {
	protected readonly abstract service: Service;

	protected readonly actionName = this.constructor.name;

	public constructor(protected readonly bot: Client<true>) {
	}

	public execute(...args: ClientEvents[EventName]): void {
		Logger.debug(`Start ${this.actionName}.`);
		Logger.debug(this.actionName, 'received:', args.join('\n'));

		this.call(...args)
			.then((response) => Logger.debug(this.actionName, 'responded:', response))
			.catch((error) => Logger.error(this.actionName, 'threw:', `${error}\n\ncaused by:\n`, args.join('\n')))
			.finally(() => Logger.debug(`Finish ${this.actionName}.`));
	}

	protected abstract call(...args: ClientEvents[EventName]): Promise<object | null>;
}
