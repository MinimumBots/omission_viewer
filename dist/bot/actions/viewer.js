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
                if (embed && embed.url !== targetURL)
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
                if ((embed === null || embed === void 0 ? void 0 : embed.url) && (embed === null || embed === void 0 ? void 0 : embed.url) === targetURL && embed.image) {
                    embeds[i] = null;
                    return urls.concat(embed.image.url);
                }
                return urls;
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
                        return [2 /*return*/, interaction.reply({
                                ephemeral: true,
                                embeds: embeds,
                            })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxxQ0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQXVMM0I7QUF2TEQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsVUFBVSxFQUFFLFVBQVU7WUFDN0MscUJBQXFCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFBLFdBQVcsSUFBSSxPQUFBLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFQZSxzQkFBVSxhQU96QixDQUFBO0lBSUQsU0FBUyxjQUFjLENBQUMsT0FBbUI7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU87UUFFeEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQzVCLFVBQXNCLEVBQUUsVUFBc0I7UUFFOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztZQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBTSxRQUFRLEdBQUc7UUFDZixVQUFVLEVBQUUsWUFB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