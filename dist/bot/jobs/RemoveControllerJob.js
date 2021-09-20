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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtb3ZlQ29udHJvbGxlckpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ib3Qvam9icy9SZW1vdmVDb250cm9sbGVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDRDQUEyRDtBQUMzRCx5REFBc0Q7QUFFdEQsTUFBYSxtQkFBb0IsU0FBUSxtQ0FBZ0I7SUFDdkQsWUFBb0IsV0FBbUM7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFEVSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0I7SUFFdkQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPO1lBQ1YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQ3JDLENBQUM7UUFFSixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQ3BDLENBQUM7UUFFSixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1RCxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9ELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLDRCQUE0QixDQUMvQyxDQUFDO1FBRUosTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxLQUFLLENBQUMsa0JBQWtCLENBQzlCLFdBQXdDO1FBRXhDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFNUIsT0FBTyxNQUFNLHdCQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN6RixDQUFDO0lBRU8sS0FBSyxDQUFDLHFCQUFxQixDQUNqQyxPQUFnQjtRQUVoQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXBELE9BQU8sd0JBQVksQ0FDakIsT0FBTyxDQUFDLE1BQU0sRUFDZCxPQUFPLENBQUMsU0FBUyxFQUNqQixTQUFTLENBQUMsU0FBUyxDQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVPLEtBQUssQ0FBQyxnQkFBZ0I7UUFDNUIsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0seUJBQWEsQ0FDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FDMUIsQ0FBQztRQUNGLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7QUE5REQsa0RBOERDIn0=