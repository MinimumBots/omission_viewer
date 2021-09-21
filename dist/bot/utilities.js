"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMessageCache = exports.deleteMessage = exports.fetchMessage = void 0;
async function fetchMessage(bot, channelId, messageId) {
    const channel = bot.channels.cache.get(channelId);
    if (!channel?.isText())
        return null;
    try {
        const message = await channel.messages.fetch(messageId);
        return message;
    }
    catch {
        return null;
    }
}
exports.fetchMessage = fetchMessage;
async function deleteMessage(bot, channelId, messageId) {
    const channel = bot.channels.cache.get(channelId);
    if (channel?.isText())
        await channel.messages.delete(messageId);
}
exports.deleteMessage = deleteMessage;
function removeMessageCache(message) {
    return message.channel.messages.cache.delete(message.id);
}
exports.removeMessageCache = removeMessageCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT08sS0FBSyxVQUFVLFlBQVksQ0FDaEMsR0FBVyxFQUFFLFNBQW9CLEVBQUUsU0FBb0I7SUFFdkQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFcEMsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFDRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFiRCxvQ0FhQztBQUVNLEtBQUssVUFBVSxhQUFhLENBQ2pDLEdBQVcsRUFBRSxTQUFvQixFQUFFLFNBQW9CO0lBRXZELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxJQUFJLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFBRSxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFMRCxzQ0FLQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLE9BQW1CO0lBQ3BELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUZELGdEQUVDIn0=