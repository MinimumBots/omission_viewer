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
    function resolveMessage(message) {
        if (!countHiddenImages(message))
            return;
        sendViewerMessage(message)
            .catch(console.error);
    }
    function resolveUpdatedMessage(oldMessage, newMessage) {
        if (!countHiddenImages(oldMessage))
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
            content: '※画像はチャンネルの一番下に表示されます',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTQSx1Q0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQXVMM0I7QUF2TEQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ2pELHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBUGUsc0JBQVUsYUFPekIsQ0FBQTtJQUlELFNBQVMsY0FBYyxDQUFDLE9BQW1CO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPO1FBRXhDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzthQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTLHFCQUFxQixDQUM1QixVQUFzQixFQUFFLFVBQXNCO1FBRTlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHO1FBQ2YsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7S0FDekIsQ0FBQztJQUVGLFNBQVMsYUFBYSxD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