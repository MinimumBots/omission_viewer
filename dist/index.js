"use strict";
/**
 * The index may be compiled and executed!
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const constants_1 = require("./constants");
const manager = new discord_js_1.ShardingManager('./dist/bot/bot.js', {
    token: constants_1.DISCORD_TOKEN,
    totalShards: constants_1.BOT_TOTAL_SHARDS,
    shardList: constants_1.BOT_SHARD_LIST,
});
manager.on('shardCreate', shard => {
    console.info(`Spawned shard ${shard.id + 1}/${manager.totalShards}.`);
});
console.info('Start spawning shards.');
manager.spawn({ timeout: -1 })
    .then(() => console.info('All shards were successfully spawned.'))
    .catch(console.error);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILDJDQUE2QztBQUM3QywyQ0FBOEU7QUFFOUUsTUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBZSxDQUFDLG1CQUFtQixFQUFFO0lBQ3ZELEtBQUssRUFBRSx5QkFBYTtJQUNwQixXQUFXLEVBQUUsNEJBQWdCO0lBQzdCLFNBQVMsRUFBRSwwQkFBYztDQUMxQixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRTtJQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUNqRSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=