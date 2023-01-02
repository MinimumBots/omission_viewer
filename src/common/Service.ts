import type { Client } from 'discord.js';

export abstract class Service {
  protected bot: Client<true>;

  public constructor(bot: Client<true>) {
    this.bot = bot;
  }
}
