"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOT_SHARD_LIST = exports.BOT_TOTAL_SHARDS = exports.DISCORD_ID = exports.DISCORD_TOKEN = void 0;
exports.DISCORD_TOKEN = process.env['DISCORD_TOKEN'] || '';
exports.DISCORD_ID = atob(exports.DISCORD_TOKEN.replace(/\..+/, ''));
exports.BOT_TOTAL_SHARDS = Number(process.env['BOT_TOTAL_SHARDS']) || 'auto';
exports.BOT_SHARD_LIST = (_b = (_a = process.env['BOT_SHARD_LIST']) === null || _a === void 0 ? void 0 : _a.split(',').map(Number)) !== null && _b !== void 0 ? _b : 'auto';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQWEsUUFBQSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkQsUUFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDLHFCQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRXJELFFBQUEsZ0JBQWdCLEdBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7QUFDekMsUUFBQSxjQUFjLEdBQ3ZCLE1BQUEsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQ0FBSSxNQUFNLENBQUMifQ==