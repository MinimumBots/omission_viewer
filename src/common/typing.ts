import type { Collection, InteractionReplyOptions } from 'discord.js';

export type ReplyPayload = InteractionReplyOptions & { fetchReply: true };
