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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uVmlld1BpY3R1cmVzSm9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9qb2JzL0J1dHRvblZpZXdQaWN0dXJlc0pvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw0Q0FBNEM7QUFDNUMsdURBQW9EO0FBRXBELE1BQWEscUJBQXNCLFNBQVEsaUNBQWU7SUFDeEQsWUFBb0IsV0FBOEI7UUFDaEQsS0FBSyxFQUFFLENBQUM7UUFEVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7SUFFbEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFUyxLQUFLLENBQUMsa0JBQWtCLENBQ2hDLFdBQXdDO1FBRXhDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFekMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFNUIsTUFBTSxjQUFjLEdBQUcsTUFBTSx3QkFBWSxDQUN2QyxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDdEQsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFakMsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7UUFDNUQsSUFBSSxDQUFDLGVBQWU7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVsQyxPQUFPLE1BQU0sd0JBQVksQ0FDdkIsV0FBVyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUMvQyxJQUFJLElBQUksQ0FBQztJQUNaLENBQUM7Q0FDRjtBQTdCRCxzREE2QkMifQ==