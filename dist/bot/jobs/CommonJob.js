"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonJob = void 0;
class CommonJob {
    replyErrorMessage(interaction, content) {
        return interaction.reply({
            content: `⚠️ **${content}**`,
            ephemeral: true,
            fetchReply: true,
        });
    }
}
exports.CommonJob = CommonJob;
