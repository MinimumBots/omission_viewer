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
            interaction.reply({ ...messagePayloads[0], fetchReply: true }),
            ...messagePayloads.slice(1)
                .map(payload => interaction.followUp(payload))
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
                lastMessage.ephemeral = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld1BpY3R1cmVzSm9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9qb2JzL1ZpZXdQaWN0dXJlc0pvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSx5REFBc0Q7QUFFdEQsTUFBc0IsZUFBZ0IsU0FBUSxtQ0FBZ0I7SUFBOUQ7O1FBMkNVLHFCQUFnQixHQUFhO1lBQ25DLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1NBQ1QsQ0FBQztRQUVNLG1CQUFjLEdBQUcsRUFBRSxDQUFDO0lBNkI5QixDQUFDO0lBbEZXLEtBQUssQ0FBQyxVQUFVLENBQ3hCLFdBQXdDO1FBRXhDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU3RSxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzlELEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ3hCLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU1PLEtBQUssQ0FBQyxxQkFBcUIsQ0FDakMsV0FBaUM7UUFFakMsT0FBTztZQUNMLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUMxQixXQUFXLEVBQUUsa0JBQWtCLENBQ2hDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxLQUFLLENBQUMsb0JBQW9CLENBQ2hDLFdBQWlDO1FBRWpDLE9BQU87WUFDTCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FDMUIsV0FBVyxFQUFFLGdCQUFnQixDQUM5QjtTQUNGLENBQUM7SUFDSixDQUFDO0lBZU8sOEJBQThCLENBQ3BDLGVBQTJCO1FBRTNCLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQ0UsQ0FBQyxXQUFXO21CQUNULENBQUMsV0FBVyxDQUFDLE1BQU07bUJBQ25CLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFDaEU7Z0JBQ0EsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7YUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFFSixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBRW5DLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBRSxFQUFrRCxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGO0FBbkZELDBDQW1GQyJ9