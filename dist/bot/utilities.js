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
