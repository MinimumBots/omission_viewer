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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnVWaWV3UGljdHVyZXNKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2pvYnMvQ29udGV4dE1lbnVWaWV3UGljdHVyZXNKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNENBQTRDO0FBQzVDLHVEQUFvRDtBQUVwRCxNQUFhLHlCQUEwQixTQUFRLGlDQUFlO0lBQzVELFlBQW9CLFdBQW1DO1FBQ3JELEtBQUssRUFBRSxDQUFDO1FBRFUsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO0lBRXZELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNYLE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRVMsS0FBSyxDQUFDLGtCQUFrQixDQUNoQyxXQUF3QztRQUV4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTVCLE9BQU8sTUFBTSx3QkFBWSxDQUN2QixXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUNwRCxJQUFJLElBQUksQ0FBQztJQUNaLENBQUM7Q0FDRjtBQXJCRCw4REFxQkMifQ==