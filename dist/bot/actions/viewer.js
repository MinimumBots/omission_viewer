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
        bot.on('messageUpdate', function (_, message) { return resolveMessage(message); });
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
    var chainMax = 4; // Maximum of images in the embed.
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
                            return [2 /*return*/, failButtonInteraction(interaction)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JvdC9hY3Rpb25zL3ZpZXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxxQ0FBb0M7QUFFcEMsSUFBaUIsV0FBVyxDQXdJM0I7QUF4SUQsV0FBaUIsV0FBVztJQUMxQixTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQzVELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsQ0FBQyxFQUFFLE9BQU8sSUFBSyxPQUFBLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQ2pFLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBQSxXQUFXLElBQUksT0FBQSxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBSmUsc0JBQVUsYUFJekIsQ0FBQTtJQUlELFNBQVMsY0FBYyxDQUFDLE9BQW1CO1FBQ3pDLElBQU0sU0FBUyxHQUFHLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFOUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQU0sUUFBUSxHQUFHO1FBQ2YsVUFBVSxFQUFFLFlBQVk7UUFDeEIsVUFBVSxFQUFFLFlBQVk7S0FDekIsQ0FBQztJQUVGLFNBQVMsYUFBYSxDQUFDLFdBQXdCO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFB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