"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOT_SHARD_LIST = exports.BOT_TOTAL_SHARDS = exports.DISCORD_TOKEN = void 0;
exports.DISCORD_TOKEN = process.env['DISCORD_TOKEN'] || '';
exports.BOT_TOTAL_SHARDS = Number(process.env['BOT_TOTAL_SHARDS']) || 'auto';
exports.BOT_SHARD_LIST = process.env['BOT_SHARD_LIST']?.split(',').map(Number) ?? 'auto';
