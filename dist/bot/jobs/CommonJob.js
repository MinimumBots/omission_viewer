"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonJob = void 0;
const discord_js_1 = require("discord.js");
class CommonJob {
    getTriggerChannelId(interaction) {
        let message = null;
        if (interaction.channelId)
            return interaction.channelId;
        if (interaction instanceof discord_js_1.ContextMenuInteraction) {
            if (interaction.targetType === 'MESSAGE')
                message = interaction.options.getMessage('message');
            else
                return null;
        }
        if (interaction instanceof discord_js_1.MessageComponentInteraction)
            message = interaction.message;
        if (!message)
            return null;
        return message instanceof discord_js_1.Message ? message.channelId : message.channel_id;
    }
    replyErrorMessage(interaction, content) {
        return interaction.reply({
            content: `⚠️ **${content}**`,
            ephemeral: true,
            fetchReply: true,
        });
    }
}
exports.CommonJob = CommonJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uSm9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9qb2JzL0NvbW1vbkpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FLb0I7QUFPcEIsTUFBc0IsU0FBUztJQUduQixtQkFBbUIsQ0FDM0IsV0FBd0M7UUFFeEMsSUFBSSxPQUFPLEdBQThCLElBQUksQ0FBQztRQUU5QyxJQUFJLFdBQVcsQ0FBQyxTQUFTO1lBQUUsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBRXhELElBQUksV0FBVyxZQUFZLG1DQUFzQixFQUFFO1lBQ2pELElBQUksV0FBVyxDQUFDLFVBQVUsS0FBSyxTQUFTO2dCQUN0QyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUVwRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxXQUFXLFlBQVksd0NBQTJCO1lBQ3BELE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBRWhDLElBQUksQ0FBQyxPQUFPO1lBQ1YsT0FBTyxJQUFJLENBQUM7UUFFZCxPQUFPLE9BQU8sWUFBWSxvQkFBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQzdFLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsV0FBaUMsRUFDakMsT0FBZTtRQUVmLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN2QixPQUFPLEVBQUUsUUFBUSxPQUFPLElBQUk7WUFDNUIsU0FBUyxFQUFFLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQ0QsOEJBbUNDIn0=