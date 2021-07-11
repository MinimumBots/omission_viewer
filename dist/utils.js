"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils;
(function (Utils) {
    async function fetchMessage(bot, channelId, messageId) {
        const channel = bot.channels.cache.get(`${BigInt(channelId)}`);
        if (!channel?.isText())
            return;
        try {
            const message = await channel.messages.fetch(`${BigInt(messageId)}`);
            return message;
        }
        catch {
            return;
        }
    }
    Utils.fetchMessage = fetchMessage;
    async function deleteMessage(bot, channelId, messageId) {
        const channel = bot.channels.cache.get(`${BigInt(channelId)}`);
        if (channel?.isText())
            await channel.messages.delete(`${BigInt(messageId)}`);
    }
    Utils.deleteMessage = deleteMessage;
    const customIdSeparator = ',';
    function generateCustomId(prefix, args) {
        return [prefix, ...args].join(customIdSeparator);
    }
    Utils.generateCustomId = generateCustomId;
    function parseCustomId(customId) {
        const splited = customId.split(customIdSeparator);
        return { prefix: splited[0], args: splited.slice(1) };
    }
    Utils.parseCustomId = parseCustomId;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsSUFBaUIsS0FBSyxDQXNDckI7QUF0Q0QsV0FBaUIsS0FBSztJQUNiLEtBQUssVUFBVSxZQUFZLENBQ2hDLEdBQVcsRUFBRSxTQUE2QixFQUFFLFNBQTZCO1FBRXpFLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFBRSxPQUFPO1FBRS9CLElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRSxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE1BQU07WUFDSixPQUFPO1NBQ1I7SUFDSCxDQUFDO0lBYnFCLGtCQUFZLGVBYWpDLENBQUE7SUFFTSxLQUFLLFVBQVUsYUFBYSxDQUNqQyxHQUFXLEVBQUUsU0FBNkIsRUFBRSxTQUE2QjtRQUV6RSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUFFLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFMcUIsbUJBQWEsZ0JBS2xDLENBQUE7SUFFRCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztJQUU5QixTQUFnQixnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsSUFBYztRQUM3RCxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUZlLHNCQUFnQixtQkFFL0IsQ0FBQTtJQU9ELFNBQWdCLGFBQWEsQ0FBQyxRQUFnQjtRQUM1QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBSGUsbUJBQWEsZ0JBRzVCLENBQUE7QUFDSCxDQUFDLEVBdENnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFzQ3JCIn0=