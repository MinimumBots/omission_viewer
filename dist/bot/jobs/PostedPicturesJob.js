"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostedPicturesJob = void 0;
const constants_1 = require("../constants");
const ViewerRelatedJob_1 = require("./ViewerRelatedJob");
class PostedPicturesJob extends ViewerRelatedJob_1.ViewerRelatedJob {
    constructor(bot, message, oldMessage) {
        super();
        this.bot = bot;
        this.message = message;
        this.oldMessage = oldMessage;
    }
    static sweepMessageIds(bot) {
        const channels = bot.channels.cache;
        this.respondedMessageIds.forEach((messageId, channelId, messageIds) => {
            const channel = channels.get(channelId);
            if (!channel || !channel.isText())
                return;
            if (!channel.messages.cache.has(messageId))
                messageIds.delete(messageId);
        });
    }
    static entryRespondedMessage(message) {
        return this.respondedMessageIds.set(message.id, message.channelId);
    }
    async respond() {
        const channel = this.message.channel;
        if (channel.type === 'DM'
            || !channel.permissionsFor(this.bot.user)?.has('SEND_MESSAGES')
            || PostedPicturesJob.respondedMessageIds.has(this.message.id)
            || this.oldMessage && this.containsSomePictures(this.oldMessage)
            || !this.containsSomePictures(this.message))
            return null;
        PostedPicturesJob.entryRespondedMessage(this.message);
        return await this.sendController();
    }
    containsSomePictures(message) {
        return this.collectImageURLsChunks(message)
            .some(urls => urls.length - 1 > 0);
    }
    async sendController() {
        const message = await this.message.fetch();
        return await message.reply({
            content: 'このメッセージ内のすべての画像をチャンネルの一番下に表示します',
            components: [
                {
                    type: 'ACTION_ROW',
                    components: [
                        {
                            type: 'BUTTON',
                            style: 'SUCCESS',
                            label: 'すべての画像を表示',
                            customId: constants_1.ButtonPrefixes.viewPictures,
                        },
                    ],
                },
            ],
            allowedMentions: { repliedUser: false },
        });
    }
}
exports.PostedPicturesJob = PostedPicturesJob;
PostedPicturesJob.respondedMessageIds = new Map();
