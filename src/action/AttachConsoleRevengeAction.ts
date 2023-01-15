import { Action } from '../base/Action.js';
import { AttachConsoleService } from '../service/AttachConsoleService.js';

import type { Message, PartialMessage } from 'discord.js';

export class AttachConsoleRevengeAction extends Action<'messageUpdate'> {
	protected override readonly service = new AttachConsoleService(this.bot);

	protected override async call(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): Promise<object | null> {
		if (!this.service.isAttachable(newMessage) || !this.service.isRevengeable(newMessage, oldMessage)) {
			return null;
		}

		return this.service.attach(newMessage);
	}
}
