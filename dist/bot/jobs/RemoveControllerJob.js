"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveControllerJob = void 0;
const utilities_1 = require("../utilities");
const ViewerRelatedJob_1 = require("./ViewerRelatedJob");
class RemoveControllerJob extends ViewerRelatedJob_1.ViewerRelatedJob {
    constructor(interaction) {
        super();
        this.interaction = interaction;
    }
    async respond() {
        const message = await this.fetchTargetMessage(this.interaction);
        if (!message)
            return this.replyErrorMessage(this.interaction, 'メッセージが見つかりませんでした');
        if (message.author.id !== message.client.user?.id)
            return this.replyErrorMessage(this.interaction, '操作ボタン以外は削除できません');
        const reference = await this.fetchReferenceMessage(message);
        if (reference && this.interaction.user.id !== reference.author.id)
            return this.replyErrorMessage(this.interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです');
        await this.deleteController();
        return null;
    }
    async fetchTargetMessage(interaction) {
        if (!interaction.isContextMenu())
            return null;
        const channelId = this.getTriggerChannelId(interaction);
        if (!channelId)
            return null;
        return await utilities_1.fetchMessage(interaction.client, channelId, interaction.targetId) ?? null;
    }
    async fetchReferenceMessage(message) {
        const reference = message.reference;
        if (!reference || !reference.messageId)
            return null;
        return utilities_1.fetchMessage(message.client, message.channelId, reference.messageId);
    }
    async deleteController() {
        await this.interaction.deferReply();
        await utilities_1.deleteMessage(this.interaction.client, this.interaction.channelId, this.interaction.targetId);
        await this.interaction.deleteReply();
    }
}
exports.RemoveControllerJob = RemoveControllerJob;
