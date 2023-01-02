import { Action } from '../base/Action.js';
import { AttachConsoleService } from '../service/AttachConsoleService.js';

import type { Message } from 'discord.js';

export class AttachConsoleAction extends Action<'messageCreate'> {
	protected readonly startActionMessage: `Start ${string}.` = `Start ${AttachConsoleAction.name}.`;
	protected readonly finishActionMessage: `Finish ${string}.` = `Finish ${AttachConsoleAction.name}.`;

	protected readonly service = new AttachConsoleService(this.bot);

	protected async call(message: Message<true>): Promise<void> {
		if (!this.service.isAttachable(message)) {
			return;
		}

		await this.service.attach(message);
	}
}
