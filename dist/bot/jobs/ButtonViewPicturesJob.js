"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonViewPicturesJob = void 0;
const utilities_1 = require("../utilities");
const ViewPicturesJob_1 = require("./ViewPicturesJob");
class ButtonViewPicturesJob extends ViewPicturesJob_1.ViewPicturesJob {
    constructor(interaction) {
        super();
        this.interaction = interaction;
    }
    async respond() {
        return await this.sendImages(this.interaction);
    }
    async fetchTargetMessage(interaction) {
        if (!interaction.isButton())
            return null;
        const channelId = this.getTriggerChannelId(interaction);
        if (!channelId)
            return null;
        const triggerMessage = await utilities_1.fetchMessage(interaction.client, channelId, interaction.message.id);
        if (!triggerMessage)
            return null;
        const targetMessageId = triggerMessage.reference?.messageId;
        if (!targetMessageId)
            return null;
        return await utilities_1.fetchMessage(interaction.client, channelId, targetMessageId) ?? null;
    }
}
exports.ButtonViewPicturesJob = ButtonViewPicturesJob;
