"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuReactor = void 0;
const utilities_1 = require("../utilities");
const generators_1 = require("./generators");
var ContextMenuReactor;
(function (ContextMenuReactor) {
    ContextMenuReactor.commandNames = {
        viewImages: 'すべての画像を表示',
        deleteSelf: '操作ボタンを削除',
    };
    const commandData = [
        {
            name: ContextMenuReactor.commandNames.viewImages,
            type: 'MESSAGE',
        },
        {
            name: ContextMenuReactor.commandNames.deleteSelf,
            type: 'MESSAGE',
        },
    ];
    function initialize(bot) {
        bot.application?.commands.set(commandData)
            .catch(console.error);
        bot.on('interactionCreate', interaction => parse(interaction));
    }
    ContextMenuReactor.initialize = initialize;
    function parse(interaction) {
        if (!interaction.isContextMenu() || interaction.targetType !== 'MESSAGE')
            return;
        if (interaction.commandName === ContextMenuReactor.commandNames.viewImages)
            sendImages(interaction)
                .catch(console.error);
        if (interaction.commandName === ContextMenuReactor.commandNames.deleteSelf)
            deleteController(interaction)
                .catch(console.error);
    }
    async function sendImages(interaction) {
        const message = await utilities_1.fetchMessage(interaction.client, interaction.channelId, interaction.targetId);
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
    async function deleteController(interaction) {
        const message = await utilities_1.fetchMessage(interaction.client, interaction.channelId, interaction.targetId);
        if (!message)
            return utilities_1.replyErrorMessage(interaction, '不明なエラーが発生しました');
        if (message.author.id !== interaction.client.user?.id)
            return utilities_1.replyErrorMessage(interaction, '操作ボタン以外は削除できません');
        const referenceMessage = await utilities_1.fetchMessage(interaction.client, interaction.channelId, message.reference?.messageId ?? '');
        if (referenceMessage && interaction.user.id !== referenceMessage.author.id)
            return utilities_1.replyErrorMessage(interaction, '操作ボタンを削除できるのはメッセージの投稿者のみです');
        await interaction.deferReply();
        await utilities_1.deleteMessage(interaction.client, interaction.channelId, interaction.targetId);
        await interaction.deleteReply();
    }
})(ContextMenuReactor = exports.ContextMenuReactor || (exports.ContextMenuReactor = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnVSZWFjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9yZWFjdG9ycy9Db250ZXh0TWVudVJlYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsNENBQThFO0FBQzlFLDZDQUEyRTtBQUUzRSxJQUFpQixrQkFBa0IsQ0FxRmxDO0FBckZELFdBQWlCLGtCQUFrQjtJQUNwQiwrQkFBWSxHQUFHO1FBQzFCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLFVBQVUsRUFBRSxVQUFVO0tBQ3ZCLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBNkI7UUFDNUM7WUFDRSxJQUFJLEVBQUUsbUJBQUEsWUFBWSxDQUFDLFVBQVU7WUFDN0IsSUFBSSxFQUFFLFNBQVM7U0FDaEI7UUFDRDtZQUNFLElBQUksRUFBRSxtQkFBQSxZQUFZLENBQUMsVUFBVTtZQUM3QixJQUFJLEVBQUUsU0FBUztTQUNoQjtLQUNGLENBQUM7SUFFRixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2FBQ3ZDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFMZSw2QkFBVSxhQUt6QixDQUFBO0lBRUQsU0FBUyxLQUFLLENBQUMsV0FBd0I7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxXQUFXLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFDdEUsT0FBTztRQUVULElBQUksV0FBVyxDQUFDLFdBQVcsS0FBSyxtQkFBQSxZQUFZLENBQUMsVUFBVTtZQUNyRCxVQUFVLENBQUMsV0FBVyxDQUFDO2lCQUNwQixLQUFLLENBQUMsT0FB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