"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageViewer = void 0;
const utils_1 = require("../../utils");
var ImageViewer;
(function (ImageViewer) {
    function initialize(bot) {
        bot.on('messageCreate', message => resolveMessage(message));
        bot.on('messageUpdate', (oldMessage, newMessage) => {
            resolveUpdatedMessage(oldMessage, newMessage);
        });
        bot.on('interactionCreate', interaction => resolveButton(interaction));
    }
    ImageViewer.initialize = initialize;
    const responsedMessageIds = new Set;
    function resolveMessage(message) {
        if (!countHiddenImages(message))
            return;
        sendViewerMessage(message)
            .then(() => responsedMessageIds.add(message.id))
            .catch(console.error);
    }
    function resolveUpdatedMessage(oldMessage, newMessage) {
        if (!responsedMessageIds.has(oldMessage.id))
            resolveMessage(newMessage);
    }
    const prefixes = {
        viewImages: 'ViewImages',
        deleteSelf: 'DeleteSelf',
    };
    function resolveButton(interaction) {
        if (!interaction.isButton())
            return;
        const { prefix, args } = utils_1.Utils.parseCustomId(interaction.customId);
        if (prefix === prefixes.viewImages)
            sendViewImages(interaction, args)
                .catch(console.error);
        if (prefix === prefixes.deleteSelf)
            deleteViewerMessage(interaction, args)
                .catch(console.error);
    }
    function countHiddenImages(message) {
        return collectImageURLsChunks(message)
            .reduce((count, urls) => count + urls.length - 1, 0);
    }
    function collectImageURLsChunks(message) {
        const embeds = message.embeds.slice();
        return message.embeds.reduce((chunks, targetEmbed, i) => {
            if (!embeds[i])
                return chunks;
            const urls = embeds.reduce((urls, embed, i) => {
                if (!embed?.image || targetEmbed.url !== embed.url)
                    return urls;
                embeds[i] = null;
                return urls.concat(embed.image.url);
            }, []);
            return urls.length ? chunks.concat([urls]) : chunks;
        }, []);
    }
    async function sendViewerMessage(laxMessage) {
        const message = await laxMessage.fetch();
        await message.channel.send({
            content: '画像はこのチャンネルの一番下に表示されます',
            components: [
                {
                    type: 'ACTION_ROW',
                    components: [
                        {
                            type: 'BUTTON',
                            style: 'SUCCESS',
                            label: 'すべての画像を表示',
                            customId: utils_1.Utils.generateCustomId(prefixes.viewImages, [message.id]),
                        },
                        {
                            type: 'BUTTON',
                            style: 'DANGER',
                            label: '削除',
                            customId: utils_1.Utils.generateCustomId(prefixes.deleteSelf, [message.author.id]),
                        },
                    ],
                },
            ],
        });
    }
    const imageEmbedColors = [
        0x00bb9f,
        0xf7503f,
        0x00cb7b,
        0xf38033,
        0x0097d6,
        0xf8c53f,
        0xa45ab1,
        0xfa2961,
    ];
    async function sendViewImages(interaction, args) {
        const channelId = interaction.channelId;
        if (!channelId)
            return failButtonInteraction(interaction);
        const message = await utils_1.Utils.fetchMessage(interaction.client, channelId, args[0]);
        if (!message)
            return interaction.reply({
                ephemeral: true,
                content: '⚠️ **対象のメッセージが見つかりません**',
            });
        if (!countHiddenImages(message))
            return interaction.reply({
                ephemeral: true,
                content: '⚠️ **非表示となる画像が見つかりません**',
            });
        const chunks = collectImageURLsChunks(message);
        const embeds = chunks.reduce((embeds, urls, i) => (embeds.concat(urls.map((url, page) => ({
            color: imageEmbedColors[i],
            image: { url },
            footer: { text: `${page + 1}/${urls.length}` },
        })))), []);
        return interaction.reply({ ephemeral: true, embeds });
    }
    function deleteViewerMessage(interaction, args) {
        const channelId = interaction.channelId;
        if (!channelId)
            return failButtonInteraction(interaction);
        if (interaction.user.id === args[0])
            return utils_1.Utils.deleteMessage(interaction.client, channelId, interaction.message.id);
        return interaction.reply({
            ephemeral: true,
            content: '⚠️ **このメッセージを削除できるのはメッセージの投稿者のみです**',
        });
    }
    function failButtonInteraction(interaction) {
        return interaction.reply({
            ephemeral: true,
            content: '⚠️ **不明なエラーが発生しました**',
        });
    }
})(ImageViewer = exports.ImageViewer || (exports.ImageViewer = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSx1Q0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQTBLM0I7QUExS0QsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ2pELHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBUGUsc0JBQVUsYUFPekIsQ0FBQTtJQUlELE1BQU0sbUJBQW1CLEdBQW1CLElBQUksR0FBRyxDQUFDO0lBRXBELFNBQVMsY0FBYyxDQUFDLE9BQW1CO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPO1FBRXhDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTLHFCQUFxQixDQUM1QixVQUFzQixFQUFFLFVBQXNCO1FBRTlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVB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