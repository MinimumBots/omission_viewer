"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewPicturesJob = void 0;
const ViewerRelatedJob_1 = require("./ViewerRelatedJob");
class ViewPicturesJob extends ViewerRelatedJob_1.ViewerRelatedJob {
    constructor() {
        super(...arguments);
        this.imageEmbedColors = [
            0x00bb9f,
            0xf7503f,
            0x00cb7b,
            0xf38033,
            0x0097d6,
            0xf8c53f,
            0xa45ab1,
            0xfa2961,
        ];
        this.embedLengthMax = 10;
    }
    async sendImages(interaction) {
        const message = await this.fetchTargetMessage(interaction);
        if (!message)
            return this.replyAsMissingMessage(interaction);
        const imageURLsChunks = this.collectImageURLsChunks(message);
        if (!imageURLsChunks.length)
            return this.replyAsMissingImages(interaction);
        const messagePayloads = this.generateViewingMessagePayloads(imageURLsChunks);
        return await Promise.all([
            interaction.reply({
                ...messagePayloads[0],
                ephemeral: true,
                fetchReply: true,
            }),
            ...messagePayloads.slice(1)
                .map(payload => interaction.followUp({ ...payload, ephemeral: true }))
        ]);
    }
    async replyAsMissingMessage(interaction) {
        return [
            await this.replyErrorMessage(interaction, '対象のメッセージが見つかりません')
        ];
    }
    async replyAsMissingImages(interaction) {
        return [
            await this.replyErrorMessage(interaction, '表示する画像が見つかりません')
        ];
    }
    generateViewingMessagePayloads(imageURLsChunks) {
        return imageURLsChunks.reduce((messages, urls, i) => {
            let lastMessage = messages.at(-1);
            if (!lastMessage
                || !lastMessage.embeds
                || lastMessage.embeds.length + urls.length > this.embedLengthMax) {
                lastMessage = {};
                lastMessage.embeds = [];
                messages.push(lastMessage);
            }
            const embeds = urls.map((url, page) => ({
                color: this.imageEmbedColors[i],
                image: { url },
                footer: { text: `${page + 1}/${urls.length}` },
            }));
            lastMessage.embeds.push(...embeds);
            return messages;
        }, []);
    }
}
exports.ViewPicturesJob = ViewPicturesJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld1BpY3R1cmVzSm9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9qb2JzL1ZpZXdQaWN0dXJlc0pvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSx5REFBc0Q7QUFFdEQsTUFBc0IsZUFBZ0IsU0FBUSxtQ0FBZ0I7SUFBOUQ7O1FBK0NVLHFCQUFnQixHQUFhO1lBQ25DLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1NBQ1QsQ0FBQztRQUVNLG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBNEI5QixDQUFDO0lBckZXLEtBQUssQ0FBQyxVQUFVLENBQ3hCLFdBQXdDO1FBRXhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU3RSxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDO2dCQUNoQixHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFNBQVMsRUFBRyxJQUFJO2dCQUNoQixVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFDO1lBQ0YsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3pFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFNTyxLQUFLLENBQUMscUJBQXFCLENBQ2pDLFdBQWlDO1FBRWpDLE9BQU87WUFDTCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FDMUIsV0FBVyxFQUFFLGtCQUFrQixDQUNoQztTQUNGLENBQUM7SUFDSixDQUFDO0lBRU8sS0FBSyxDQUFDLG9CQUFvQixDQUNoQyxXQUFpQztRQUVqQyxPQUFPO1lBQ0wsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQzFCLFdBQVcsRUFBRSxnQkFBZ0IsQ0FDOUI7U0FDRixDQUFDO0lBQ0osQ0FBQztJQWVPLDhCQUE4QixDQUNwQyxlQUEyQjtRQUUzQixPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUNFLENBQUMsV0FBVzttQkFDVCxDQUFDLFdBQVcsQ0FBQyxNQUFNO21CQUNuQixXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQ2hFO2dCQUNBLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7YUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFFSixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBRW5DLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBRSxFQUFrRCxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGO0FBdEZELDBDQXNGQyJ9