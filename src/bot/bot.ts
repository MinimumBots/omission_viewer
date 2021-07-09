import { Client } from 'discord.js';
import { ImageViewer } from './actions/viewer';

const bot = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
  restTimeOffset: 100,
  retryLimit: 3,
  presence: { activities: [{ name: 'スマホで2枚目以降の画像を表示します' }] },
});

function initialize(): void {
  ImageViewer.initialize(bot);
}

bot.on('ready', () => initialize());
bot.on('shardReady', shardID => console.info(`Shard No.${shardID} is ready.`));

bot.login()
  .catch(console.error);

process.on('exit', () => bot.destroy());
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT',  () => process.exit(0));
