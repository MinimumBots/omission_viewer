import { Action } from '../base/Action.js';
import { AttachConsoleService } from '../service/AttachConsoleService.js';

import type { Message } from 'discord.js';

export class AttachConsoleAction extends Action<'messageCreate'> {
	protected override readonly service = new AttachConsoleService(this.bot);

	protected override readonly startActionMessage: `Start ${string}.` = `Start ${AttachConsoleAction.name}.`;
	protected override readonly finishActionMessage: `Finish ${string}.` = `Finish ${AttachConsoleAction.name}.`;

	protected override async call(message: Message<true>): Promise<object | null> {
		if (!this.service.isAttachable(message)) {
			return null;
		}

		return this.service.attach(message);
	}
}
