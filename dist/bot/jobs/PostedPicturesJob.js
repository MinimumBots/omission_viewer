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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdGVkUGljdHVyZXNKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2pvYnMvUG9zdGVkUGljdHVyZXNKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBRTlDLHlEQUFzRDtBQUt0RCxNQUFhLGlCQUFrQixTQUFRLG1DQUFnQjtJQWtCckQsWUFDVSxHQUFpQixFQUNqQixPQUFtQixFQUNuQixVQUF1QjtRQUUvQixLQUFLLEVBQUUsQ0FBQztRQUpBLFFBQUcsR0FBSCxHQUFHLENBQWM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFhO0lBR2pDLENBQUM7SUFyQkQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFpQjtRQUN0QyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUVwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUNwRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU87WUFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMscUJBQXFCLENBQUMsT0FBbUI7UUFDdEQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFVRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRXJDLElBQ0UsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJO2VBQ2xCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxlQUFlLENBQUM7ZUFDNUQsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2VBQzFELElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7ZUFDN0QsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzQyxPQUFPLElBQUksQ0FBQztRQUVkLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0RCxPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxPQUFtQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7YUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxjQUFjO1FBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQyxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsVUFBVSxFQUFFO3dCQUNWOzRCQUNFLElBQUksRUFBRSxRQUFROzRCQUNkLEtBQUssRUFBRSxTQUFTOzRCQUNoQixLQUFLLEVBQUUsV0FBVzs0QkFDbEIsUUFBUSxFQUFFLDBCQUFjLENBQUMsWUFBWTt5QkFDdEM7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELGVBQWUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFuRUgsOENBb0VDO0FBbkVRLHFDQUFtQixHQUE4QixJQUFJLEdBQUcsRUFBRSxDQUFDIn0=