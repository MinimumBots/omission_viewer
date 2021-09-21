import { Client } from 'discord.js';
import { setupJobs } from './router';

const bot = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
  restTimeOffset: 100,
  retryLimit: 3,
  presence: { activities: [{ name: 'スマホでツイートの画像をすべて表示' }] },
});

function initialize(): void {
  setupJobs(bot);
}

bot.on('ready', () => initialize());
bot.on('shardReady', shardId => console.info(`Shard No.${shardId} is ready.`));

bot.login()
  .catch(console.error);

process.on('exit', () => bot.destroy());
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT',  () => process.exit(0));
