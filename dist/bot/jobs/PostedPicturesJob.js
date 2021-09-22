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
    async respond() {
        const channel = this.message.channel;
        if (channel.type === 'DM'
            || !channel.permissionsFor(this.bot.user)?.has('SEND_MESSAGES')
            || PostedPicturesJob.respondedMessageIds.has(this.message.id)
            || this.oldMessage && this.containsSomePictures(this.oldMessage)
            || !this.containsSomePictures(this.message))
            return null;
        PostedPicturesJob.respondedMessageIds.add(this.message.id);
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
PostedPicturesJob.respondedMessageIds = new Set();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdGVkUGljdHVyZXNKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2pvYnMvUG9zdGVkUGljdHVyZXNKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBRTlDLHlEQUFzRDtBQUV0RCxNQUFhLGlCQUFrQixTQUFRLG1DQUFnQjtJQUdyRCxZQUNVLEdBQWlCLEVBQ2pCLE9BQW1CLEVBQ25CLFVBQXVCO1FBRS9CLEtBQUssRUFBRSxDQUFDO1FBSkEsUUFBRyxHQUFILEdBQUcsQ0FBYztRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQWE7SUFHakMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFckMsSUFDRSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUk7ZUFDbEIsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQztlQUM1RCxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7ZUFDMUQsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztlQUM3RCxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDO1FBRWQsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0QsT0FBTyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU8sb0JBQW9CLENBQUMsT0FBbUI7UUFDOUMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDO2FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYztRQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0MsT0FBTyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDekIsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFVBQVUsRUFBRTt3QkFDVjs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxLQUFLLEVBQUUsU0FBUzs0QkFDaEIsS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLFFBQVEsRUFBRSwwQkFBYyxDQUFDLFlBQVk7eUJBQ3RDO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxlQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBcERILDhDQXFEQztBQXBEUSxxQ0FBbUIsR0FBbUIsSUFBSSxHQUFHLEVBQUUsQ0FBQyJ9