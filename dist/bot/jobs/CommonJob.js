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
