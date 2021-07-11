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
        const embeds = message.embeds.slice();
        return embeds.reduce((count, embed) => (embed?.url
            ? count + collectAndSweepEqualURLEmbeds(embeds, embed.url).length - 1
            : count), 0);
    }
    function collectImageURLsChain(message) {
        const embeds = message.embeds.slice();
        return embeds.reduce((chain, targetEmbed) => {
            const url = targetEmbed?.url;
            if (!url)
                return chain;
            const urls = collectAndSweepEqualURLEmbeds(embeds, url)
                .map(embed => embed ? embed.image?.url ?? '' : '');
            return urls.length ? chain.concat([urls]) : chain;
        }, []);
    }
    function collectAndSweepEqualURLEmbeds(embeds, url) {
        return embeds
            .filter((embed, i) => {
            if (!embed?.image || embed?.url !== url)
                return false;
            embeds[i] = null;
            return true;
        });
    }
    async function sendViewerMessage(laxMessage) {
        const message = await laxMessage.fetch();
        await message.channel.send({
            content: '※画像はこのチャンネルの一番下に表示されます',
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
                content: '⚠️ 対象のメッセージが見つかりません',
            });
        if (!countHiddenImages(message))
            return interaction.reply({
                ephemeral: true,
                content: '⚠️ 非表示となる画像が見つかりません',
            });
        const chain = collectImageURLsChain(message);
        const embeds = chain.reduce((embeds, urls, i) => (embeds.concat(urls.map((url, page) => ({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFVQSx1Q0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQTBMM0I7QUExTEQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ2pELHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBUGUsc0JBQVUsYUFPekIsQ0FBQTtJQUlELE1BQU0sbUJBQW1CLEdBQW1CLElBQUksR0FBRyxDQUFDO0lBRXBELFNBQVMsY0FBYyxDQUFDLE9BQW1CO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPO1FBRXhDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTLHFCQUFxQixDQUM1QixVQUFzQixFQUFFLFVBQXNCO1FBRTlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVB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