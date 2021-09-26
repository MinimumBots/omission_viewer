"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuViewPictureJob = void 0;
const utilities_1 = require("../utilities");
const ViewPicturesJob_1 = require("./ViewPicturesJob");
class ContextMenuViewPictureJob extends ViewPicturesJob_1.ViewPicturesJob {
    constructor(interaction) {
        super();
        this.interaction = interaction;
    }
    async respond() {
        return await this.sendImages(this.interaction);
    }
    async fetchTargetMessage(interaction) {
        if (!interaction.isContextMenu())
            return null;
        const channelId = this.getTriggerChannelId(interaction);
        if (!channelId)
            return null;
        return await utilities_1.fetchMessage(interaction.client, channelId, interaction.targetId) ?? null;
    }
}
exports.ContextMenuViewPictureJob = ContextMenuViewPictureJob;
