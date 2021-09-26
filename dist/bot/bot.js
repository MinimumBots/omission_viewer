"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const router_1 = require("./router");
const bot = new discord_js_1.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
    restTimeOffset: 100,
    retryLimit: 3,
    presence: { activities: [{ name: 'スマホでツイートの画像をすべて表示' }] },
});
function initialize(bot) {
    router_1.setupJobs(bot);
}
bot
    .on('ready', bot => initialize(bot))
    .on('shardReady', shardId => console.info(`Shard No.${shardId} is ready.`));
bot.login()
    .catch(console.error);
['SIGTERM', 'SIGINT']
    .forEach(signal => process.on(signal, () => {
    bot.destroy();
    process.exit(0);
}));
