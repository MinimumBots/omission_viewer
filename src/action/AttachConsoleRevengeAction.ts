import { Action } from '../base/Action.js';
import { AttachConsoleService } from '../service/AttachConsoleService.js';

import type { Message, PartialMessage } from 'discord.js';

export class AttachConsoleRevengeAction extends Action<'messageUpdate'> {
	protected readonly startActionMessage: `Start ${string}.` = `Start ${AttachConsoleRevengeAction.name}.`;
	protected readonly finishActionMessage: `Finish ${string}.` = `Finish ${AttachConsoleRevengeAction.name}.`;

	protected service = new AttachConsoleService(this.bot);

	protected async call(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): Promise<void> {
		if (!this.service.isAttachable(newMessage) || !this.service.isRevengeable(newMessage, oldMessage)) {
			return;
		}

		await this.service.attach(newMessage);
	}
}
