"use strict";
/**
 * The index may be compiled and executed!
 */
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var constants_1 = require("./constants");
var manager = new discord_js_1.ShardingManager('./dist/bot/bot.js', {
    token: constants_1.DISCORD_TOKEN,
    totalShards: constants_1.BOT_TOTAL_SHARDS,
    shardList: constants_1.BOT_SHARD_LIST,
});
manager.on('shardCreate', function (shard) {
    console.info("Spawned shard " + (shard.id + 1) + "/" + manager.totalShards + ".");
});
console.info('Start spawning shards.');
manager.spawn({ timeout: -1 })
    .then(function () { return console.info('All shards were successfully spawned.'); })
    .catch(console.error);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILHlDQUE2QztBQUM3Qyx5Q0FBOEU7QUFFOUUsSUFBTSxPQUFPLEdBQUcsSUFBSSw0QkFBZSxDQUFDLG1CQUFtQixFQUFFO0lBQ3ZELEtBQUssRUFBRSx5QkFBYTtJQUNwQixXQUFXLEVBQUUsNEJBQWdCO0lBQzdCLFNBQVMsRUFBRSwwQkFBYztDQUMxQixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFBLEtBQUs7SUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBaUIsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUksT0FBTyxDQUFDLFdBQVcsTUFBRyxDQUFDLENBQUM7QUFDeEUsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzNCLElBQUksQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxFQUFyRCxDQUFxRCxDQUFDO0tBQ2pFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMifQ==