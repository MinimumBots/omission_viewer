"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuViewPictureJob = void 0;
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
        if (!interaction.isMessageContextMenu())
            return null;
        return this.interaction.targetMessage;
    }
}
exports.ContextMenuViewPictureJob = ContextMenuViewPictureJob;
