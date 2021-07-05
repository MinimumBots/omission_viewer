export const DISCORD_TOKEN = process.env['DISCORD_TOKEN'] || '';
export const DISCORD_ID = atob(DISCORD_TOKEN.replace(/\..+/, ''));

export const BOT_TOTAL_SHARDS: number | 'auto'
  = Number(process.env['BOT_TOTAL_SHARDS']) || 'auto';
export const BOT_SHARD_LIST: number[] | 'auto'
  = process.env['BOT_SHARD_LIST']?.split(',').map(Number) ?? 'auto';
