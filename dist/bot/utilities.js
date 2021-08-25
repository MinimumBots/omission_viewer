"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyErrorMessage = exports.removeMessageCache = exports.deleteMessage = exports.fetchMessage = void 0;
async function fetchMessage(bot, channelId, messageId) {
    const channel = bot.channels.cache.get(channelId);
    if (!channel?.isText())
        return;
    try {
        const message = await channel.messages.fetch(messageId);
        return message;
    }
    catch {
        return;
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
function replyErrorMessage(interaction, content) {
    return interaction.reply({ content: `⚠️ **${content}**`, ephemeral: true });
}
exports.replyErrorMessage = replyErrorMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU08sS0FBSyxVQUFVLFlBQVksQ0FDaEMsR0FBVyxFQUFFLFNBQW9CLEVBQUUsU0FBb0I7SUFFdkQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQUUsT0FBTztJQUUvQixJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELE1BQU07UUFDSixPQUFPO0tBQ1I7QUFDSCxDQUFDO0FBYkQsb0NBYUM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUNqQyxHQUFXLEVBQUUsU0FBb0IsRUFBRSxTQUFvQjtJQUV2RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQUUsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBTEQsc0NBS0M7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxPQUFtQjtJQUNwRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCxnREFFQztBQUVELFNBQWdCLGlCQUFpQixDQUMvQixXQUFpRSxFQUNqRSxPQUFlO0lBRWYsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsT0FBTyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUxELDhDQUtDIn0=