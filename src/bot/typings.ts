import type {
  BaseCommandInteraction,
  ContextMenuInteraction,
  Message,
  MessageComponentInteraction,
  PartialMessage,
  CacheType,
} from 'discord.js';

export type LaxMessage = Message | PartialMessage;

export type ReplyableInteraction<Cached extends CacheType = CacheType>
  = BaseCommandInteraction<Cached> | MessageComponentInteraction<Cached>;
export type MessageTriggeredInteraction<Cached extends CacheType = CacheType>
  = ContextMenuInteraction<Cached> | MessageComponentInteraction<Cached>;
