import type { Collection, InteractionReplyOptions } from 'discord.js';

export type ImageUrlPair = [string, string[]];
export type ImageUrlsMap = Collection<ImageUrlPair[0], ImageUrlPair[1]>;
export type ReplyPayload = InteractionReplyOptions & { fetchReply: true };
