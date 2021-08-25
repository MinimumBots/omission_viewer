"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonReactor = void 0;
const utilities_1 = require("../utilities");
const generators_1 = require("./generators");
var ButtonReactor;
(function (ButtonReactor) {
    function initialize(bot) {
        bot.on('interactionCreate', interaction => parse(interaction));
    }
    ButtonReactor.initialize = initialize;
    ButtonReactor.prefixes = {
        viewImages: 'ViewImages',
        deleteSelf: 'DeleteSelf',
    };
    const customIdSeparator = ',';
    // Will be removed in the next update.
    function parseCustomId(customId) {
        const splited = customId.split(customIdSeparator);
        return { prefix: splited[0], args: splited.slice(1) };
    }
    ButtonReactor.parseCustomId = parseCustomId;
    function parse(interaction) {
        if (!interaction.isButton())
            return;
        const { prefix, args } = parseCustomId(interaction.customId);
        if (prefix === ButtonReactor.prefixes.viewImages)
            sendImages(interaction, args)
                .catch(console.error);
        if (prefix === ButtonReactor.prefixes.deleteSelf)
            deleteController(interaction, args)
                .catch(console.error);
    }
    // Will be removed 'args' in the next update.
    async function sendImages(interaction, args) {
        const channelId = interaction.channelId;
        if (!channelId)
            return failButtonInteraction(interaction);
        const targetMessage = await utilities_1.fetchMessage(interaction.client, channelId, interaction.message.id);
        if (!targetMessage)
            return failButtonInteraction(interaction);
        const message = await utilities_1.fetchMessage(interaction.client, channelId, targetMessage.reference?.messageId ?? args[0]);
        if (!message)
            return utilities_1.replyErrorMessage(interaction, '対象のメッセージが見つかりません');
        const imageURLsChunks = generators_1.collectImageURLsChunks(message);
        if (!imageURLsChunks.length)
            return utilities_1.replyErrorMessage(interaction, '表示する画像が見つかりません');
        const embedsChunks = generators_1.generateEmbedChunks(imageURLsChunks);
        Promise.all([
            interaction.reply({ embeds: embedsChunks[0], ephemeral: true }),
            embedsChunks.slice(1)
                .map(embeds => interaction.followUp({ embeds, ephemeral: true }))
        ]);
    }
    async function deleteController(interaction, args) {
        const channelId = interaction.channelId;
        if (!channelId)
            return failButtonInteraction(interaction);
        if (interaction.user.id === args[0])
            return utilities_1.deleteMessage(interaction.client, channelId, interaction.message.id);
        await utilities_1.replyErrorMessage(interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです');
    }
    function failButtonInteraction(interaction) {
        return utilities_1.replyErrorMessage(interaction, '不明なエラーが発生しました');
    }
})(ButtonReactor = exports.ButtonReactor || (exports.ButtonReactor = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uUmVhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ib3QvcmVhY3RvcnMvQnV0dG9uUmVhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSw0Q0FBOEU7QUFDOUUsNkNBQTJFO0FBRTNFLElBQWlCLGFBQWEsQ0F3RjdCO0FBeEZELFdBQWlCLGFBQWE7SUFDNUIsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7UUFDcEMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFGZSx3QkFBVSxhQUV6QixDQUFBO0lBRVksc0JBQVEsR0FBRztRQUN0QixVQUFVLEVBQUUsWUFBWTtRQUN4QixVQUFVLEVBQUUsWUFBWTtLQUN6QixDQUFDO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7SUFFOUIsc0NBQXNDO0lBQ3RDLFNBQWdCLGFBQWEsQ0FBQyxRQUFnQjtRQUk1QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBTmUsMkJBQWEsZ0JBTTVCLENBQUE7SUFFRCxTQUFTLEtBQUssQ0FBQyxXQUF3QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU87UUFFcEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELElBQUksTUFBTSxLQUFLLGNBQUEsUUFBUSxDQUFDLFVBQVU7WUFDaEMsVUFBVSxDQUFDLFdBQVcsRUFB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