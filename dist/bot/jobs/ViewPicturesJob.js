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
        const imageURLsMap = this.collectImageURLsMap(message);
        if (!imageURLsMap.size)
            return this.replyAsMissingImages(interaction);
        const messagePayloads = this.generateViewingMessagePayloads(imageURLsMap);
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
    generateViewingMessagePayloads(imageURLsMap) {
        return [...imageURLsMap].reduce((payloads, pair, i) => {
            let lastMessage = payloads.at(-1);
            const [siteURL, imageURLs] = pair;
            if (!lastMessage
                || !lastMessage.embeds
                || lastMessage.embeds.length + imageURLs.length > this.embedLengthMax) {
                lastMessage = {};
                lastMessage.embeds = [];
                payloads.push(lastMessage);
            }
            const embeds = imageURLs.map((imageURL, page) => ({
                color: this.imageEmbedColors[i],
                url: page === 0 ? siteURL : undefined,
                title: page === 0 ? '画像の元ページを開く' : undefined,
                image: { url: imageURL },
                footer: { text: `${page + 1}/${imageURLs.length}` },
            }));
            lastMessage.embeds.push(...embeds);
            return payloads;
        }, []);
    }
}
exports.ViewPicturesJob = ViewPicturesJob;
