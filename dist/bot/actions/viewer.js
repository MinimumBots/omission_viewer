"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageViewer = void 0;
var utils_1 = require("../../utils");
var ImageViewer;
(function (ImageViewer) {
    function initialize(bot) {
        bot.on('messageCreate', function (message) { return resolveMessage(message); });
        bot.on('messageUpdate', function (oldMessage, newMessage) {
            resolveUpdatedMessage(oldMessage, newMessage);
        });
        bot.on('interactionCreate', function (interaction) { return resolveButton(interaction); });
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
    var prefixes = {
        viewImages: 'ViewImages',
        deleteSelf: 'DeleteSelf',
    };
    function resolveButton(interaction) {
        if (!interaction.isButton())
            return;
        var _a = utils_1.Utils.parseCustomId(interaction.customId), prefix = _a.prefix, args = _a.args;
        if (prefix === prefixes.viewImages)
            sendViewImages(interaction, args)
                .catch(console.error);
        if (prefix === prefixes.deleteSelf)
            deleteViewerMessage(interaction, args)
                .catch(console.error);
    }
    function countHiddenImages(message) {
        var embeds = message.embeds.slice();
        return embeds.reduce(function (count, targetEmbed) {
            var targetURL = targetEmbed === null || targetEmbed === void 0 ? void 0 : targetEmbed.url;
            if (!targetURL)
                return count;
            return count + embeds.filter(function (embed, i) {
                if (!(embed === null || embed === void 0 ? void 0 : embed.image) || (embed === null || embed === void 0 ? void 0 : embed.url) !== targetURL)
                    return false;
                embeds[i] = null;
                return true;
            }).length - 1;
        }, 0);
    }
    function collectImageURLsChain(message) {
        var embeds = message.embeds.slice();
        return embeds.reduce(function (chain, targetEmbed) {
            var targetURL = targetEmbed === null || targetEmbed === void 0 ? void 0 : targetEmbed.url;
            if (!targetURL)
                return chain;
            var urls = embeds.reduce(function (urls, embed, i) {
                if (!(embed === null || embed === void 0 ? void 0 : embed.image) || embed.url !== targetURL)
                    return urls;
                embeds[i] = null;
                return urls.concat(embed.image.url);
            }, []);
            return urls.length ? chain.concat([urls]) : chain;
        }, []);
    }
    function sendViewerMessage(laxMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, laxMessage.fetch()];
                    case 1:
                        message = _a.sent();
                        return [4 /*yield*/, message.channel.send({
                                content: '\u200B',
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
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var imageEmbedColors = [
        0x00bb9f,
        0xf7503f,
        0x00cb7b,
        0xf38033,
        0x0097d6,
        0xf8c53f,
        0xa45ab1,
        0xfa2961,
    ];
    function sendViewImages(interaction, args) {
        return __awaiter(this, void 0, void 0, function () {
            var channelId, message, chain, embeds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = interaction.channelId;
                        if (!channelId)
                            return [2 /*return*/, failButtonInteraction(interaction)];
                        return [4 /*yield*/, utils_1.Utils.fetchMessage(interaction.client, channelId, args[0])];
                    case 1:
                        message = _a.sent();
                        if (!message)
                            return [2 /*return*/, interaction.reply({
                                    ephemeral: true,
                                    content: '⚠️ 対象のメッセージが見つかりません',
                                })];
                        if (!countHiddenImages(message))
                            return [2 /*return*/, interaction.reply({
                                    ephemeral: true,
                                    content: '⚠️ 非表示となる画像が見つかりません',
                                })];
                        chain = collectImageURLsChain(message);
                        embeds = chain.reduce(function (embeds, urls, i) { return (embeds.concat(urls.map(function (url, page) { return ({
                            color: imageEmbedColors[i],
                            image: { url: url },
                            footer: { text: page + 1 + "/" + urls.length },
                        }); }))); }, []);
                        return [2 /*return*/, interaction.reply({ ephemeral: true, embeds: embeds })];
                }
            });
        });
    }
    function deleteViewerMessage(interaction, args) {
        var channelId = interaction.channelId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxxQ0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQW1MM0I7QUFuTEQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsVUFBVSxFQUFFLFVBQVU7WUFDN0MscUJBQXFCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFBLFdBQVcsSUFBSSxPQUFBLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFQZSxzQkFBVSxhQU96QixDQUFBO0lBSUQsU0FBUyxjQUFjLENBQUMsT0FBbUI7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU87UUFFeEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQzVCLFVBQXNCLEVBQUUsVUFBc0I7UUFFOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztZQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBTSxRQUFRLEdBQUc7UUFDZixVQUFVLEVBQUUsWUFB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