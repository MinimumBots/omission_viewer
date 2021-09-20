"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostedPicturesJob = void 0;
const constants_1 = require("../constants");
const utilities_1 = require("../utilities");
const ViewerRelatedJob_1 = require("./ViewerRelatedJob");
class PostedPicturesJob extends ViewerRelatedJob_1.ViewerRelatedJob {
    constructor(message, oldMessage) {
        super();
        this.message = message;
        this.oldMessage = oldMessage;
    }
    async respond() {
        if (this.oldMessage && !this.containsSomePictures(this.oldMessage)
            || !this.containsSomePictures(this.message)) {
            utilities_1.removeMessageCache(this.message);
            return null;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdGVkUGljdHVyZXNKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2pvYnMvUG9zdGVkUGljdHVyZXNKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNENBQThDO0FBRTlDLDRDQUFrRDtBQUNsRCx5REFBc0Q7QUFFdEQsTUFBYSxpQkFBa0IsU0FBUSxtQ0FBZ0I7SUFHckQsWUFDUyxPQUFtQixFQUNuQixVQUF1QjtRQUU5QixLQUFLLEVBQUUsQ0FBQztRQUhELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtJQUdoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUNFLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztlQUMzRCxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQzNDO1lBQ0EsOEJBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxPQUFtQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUM7YUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxjQUFjO1FBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQyxPQUFPLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsWUFBWTtvQkFDbEIsVUFBVSxFQUFFO3dCQUNWOzRCQUNFLElBQUksRUFBRSxRQUFROzRCQUNkLEtBQUssRUFBRSxTQUFTOzRCQUNoQixLQUFLLEVBQUUsV0FBVzs0QkFDbEIsUUFBUSxFQUFFLDBCQUFjLENBQUMsWUFBWTt5QkFDdEM7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELGVBQWUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEvQ0gsOENBZ0RDO0FBL0NRLHFDQUFtQixHQUFtQixJQUFJLEdBQUcsRUFBRSxDQUFDIn0=