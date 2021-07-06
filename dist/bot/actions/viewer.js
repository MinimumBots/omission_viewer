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
        var imageURLs = collectChainImageURLs(message);
        if (!imageURLs.length)
            return;
        sendViewerMessage(message)
            .catch(console.error);
    }
    function resolveUpdatedMessage(oldMessage, newMessage) {
        if (!collectChainImageURLs(oldMessage).length)
            resolveMessage(newMessage);
    }
    var prefixes = {
        viewImages: 'ViewImages',
        deleteSelf: 'DeleteSelf',
    };
    function resolveButton(interaction) {
        if (!interaction.isButton())
            return;
        var _a = utils_1.Utils.parseCustomID(interaction.customID), prefix = _a.prefix, args = _a.args;
        if (prefix === prefixes.viewImages)
            sendViewImages(interaction, args)
                .catch(console.error);
        if (prefix === prefixes.deleteSelf)
            deleteViewerMessage(interaction, args)
                .catch(console.error);
    }
    var chainMax = 4; // Maximum of images in one embed.
    function collectChainImageURLs(message) {
        var embeds = message.embeds;
        var chain = [];
        var queue = [];
        var targetURL = null;
        embeds.forEach(function (embed, i) {
            var _a;
            if (targetURL && targetURL === embed.url) {
                var imageURL = (_a = embed.image) === null || _a === void 0 ? void 0 : _a.url;
                if (imageURL && queue.length < chainMax)
                    queue.push(imageURL);
            }
            else {
                if (targetURL) {
                    chain.push.apply(chain, queue);
                    queue.length = 0;
                }
                targetURL = embeds[i].url;
            }
        });
        return chain.concat(queue);
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
                                                label: '続きの画像を表示',
                                                customID: utils_1.Utils.generateCustomID(prefixes.viewImages, [message.id]),
                                            },
                                            {
                                                type: 'BUTTON',
                                                style: 'DANGER',
                                                label: '削除',
                                                customID: utils_1.Utils.generateCustomID(prefixes.deleteSelf, [message.author.id]),
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
    function sendViewImages(interaction, args) {
        return __awaiter(this, void 0, void 0, function () {
            var channelID, message, imageURLs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelID = interaction.channelID;
                        if (!channelID)
                            return [2 /*return*/, failButtonInteraction(interaction)];
                        return [4 /*yield*/, utils_1.Utils.fetchMessage(interaction.client, channelID, args[0])];
                    case 1:
                        message = _a.sent();
                        if (!message)
                            return [2 /*return*/, failButtonInteraction(interaction)];
                        imageURLs = collectChainImageURLs(message);
                        if (!imageURLs.length)
                            return [2 /*return*/, interaction.reply({
                                    ephemeral: true,
                                    content: '⚠️ 2枚目以降の画像が見つかりませんでした',
                                })];
                        return [2 /*return*/, interaction.reply({
                                ephemeral: true,
                                embeds: imageURLs.map(function (url) { return ({ image: { url: url } }); }),
                            })];
                }
            });
        });
    }
    function deleteViewerMessage(interaction, args) {
        var channelID = interaction.channelID;
        if (!channelID)
            return failButtonInteraction(interaction);
        if (interaction.user.id === args[0])
            return utils_1.Utils.deleteMessage(interaction.client, channelID, interaction.message.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxxQ0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQW9KM0I7QUFwSkQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsVUFBVSxFQUFFLFVBQVU7WUFDN0MscUJBQXFCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFBLFdBQVcsSUFBSSxPQUFBLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFQZSxzQkFBVSxhQU96QixDQUFBO0lBSUQsU0FBUyxjQUFjLENBQUMsT0FBbUI7UUFDekMsSUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUU5QixpQkFBaUIsQ0FBQyxPQUFPLENBQUM7YUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsVUFBc0IsRUFBRSxVQUFzQjtRQUU5QyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTTtZQUFFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FB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