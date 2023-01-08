import type { InteractionReplyOptions } from 'discord.js';
import type { ImplementedContextMenu } from '../base/ImplementedContextMenu';

export type ReplyPayload = InteractionReplyOptions & { fetchReply: true };

export type ImplementedCommand =
	| ImplementedContextMenu;
