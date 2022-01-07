"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewPicturesJob = void 0;
const ViewerRelatedJob_1 = require("./ViewerRelatedJob");
class ViewPicturesJob extends ViewerRelatedJob_1.ViewerRelatedJob {
    constructor() {
        super(...arguments);
        this.imageEmbedColors = [
            0x00bb9f,
            0xf7503f,
            0x00cb7b,
            0xf38033,
            0x0097d6,
            0xf8c53f,
            0xa45ab1,
            0xfa2961,
        ];
        this.embedLengthMax = 10;
    }
    async sendImages(interaction) {
        const message = await this.fetchTargetMessage(interaction);
        if (!message)
            return this.replyAsMissingMessage(interaction);
        const imageURLsChunks = this.collectImageURLsChunks(message);
        if (!imageURLsChunks.length)
            return this.replyAsMissingImages(interaction);
        const messagePayloads = this.generateViewingMessagePayloads(imageURLsChunks);
        const repliedMessage = await interaction.reply({
            content: `${interaction.user}`,
            ...messagePayloads[0],
            ephemeral: true,
            fetchReply: true,
        });
        const followUpedMessages = await Promise.all(messagePayloads
            .slice(1)
            .map(payload => interaction.followUp({ ...payload, ephemeral: true })));
        return [repliedMessage, ...followUpedMessages];
    }
    async replyAsMissingMessage(interaction) {
        return [
            await this.replyErrorMessage(interaction, '対象のメッセージが見つかりません')
        ];
    }
    async replyAsMissingImages(interaction) {
        return [
            await this.replyErrorMessage(interaction, '表示する画像が見つかりません')
        ];
    }
    generateViewingMessagePayloads(imageURLsChunks) {
        return imageURLsChunks.reduce((messages, urls, i) => {
            let lastMessage = messages.at(-1);
            if (!lastMessage
                || !lastMessage.embeds
                || lastMessage.embeds.length + urls.length > this.embedLengthMax) {
                lastMessage = {};
                lastMessage.embeds = [];
                messages.push(lastMessage);
            }
            const embeds = urls.map((url, page) => ({
                color: this.imageEmbedColors[i],
                image: { url },
                footer: { text: `${page + 1}/${urls.length}` },
            }));
            lastMessage.embeds.push(...embeds);
            return messages;
        }, []);
    }
}
exports.ViewPicturesJob = ViewPicturesJob;
