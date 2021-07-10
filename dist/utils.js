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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils;
(function (Utils) {
    function fetchMessage(bot, channelId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, message, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channel = bot.channels.cache.get("" + BigInt(channelId));
                        if (!(channel === null || channel === void 0 ? void 0 : channel.isText()))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.messages.fetch("" + BigInt(messageId))];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, message];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    Utils.fetchMessage = fetchMessage;
    function deleteMessage(bot, channelId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = bot.channels.cache.get("" + BigInt(channelId));
                        if (!(channel === null || channel === void 0 ? void 0 : channel.isText())) return [3 /*break*/, 2];
                        return [4 /*yield*/, channel.messages.delete("" + BigInt(messageId))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    Utils.deleteMessage = deleteMessage;
    var customIdSeparator = ',';
    function generateCustomId(prefix, args) {
        return __spreadArray([prefix], args).join(customIdSeparator);
    }
    Utils.generateCustomId = generateCustomId;
    function parseCustomId(customId) {
        var splited = customId.split(customIdSeparator);
        return { prefix: splited[0], args: splited.slice(1) };
    }
    Utils.parseCustomId = parseCustomId;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFpQixLQUFLLENBc0NyQjtBQXRDRCxXQUFpQixLQUFLO0lBQ3BCLFNBQXNCLFlBQVksQ0FDaEMsR0FBVyxFQUFFLFNBQTZCLEVBQUUsU0FBNkI7Ozs7Ozt3QkFFbkUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFDO3dCQUMvRCxJQUFJLENBQUMsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFFLENBQUE7NEJBQUUsc0JBQU87Ozs7d0JBR2IscUJBQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFHLENBQUMsRUFBQTs7d0JBQTlELE9BQU8sR0FBRyxTQUFvRDt3QkFDcEUsc0JBQU8sT0FBTyxFQUFDOzs7d0JBR2Ysc0JBQU87Ozs7O0tBRVY7SUFicUIsa0JBQVksZUFhakMsQ0FBQTtJQUVELFNBQXNCLGFBQWEsQ0FDakMsR0FBVyxFQUFFLFNBQTZCLEVBQUUsU0FBNkI7Ozs7Ozt3QkFFbkUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFDOzZCQUMzRCxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLEVBQUUsQ0FBQSxFQUFqQix3QkFBaUI7d0JBQUUscUJBQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFHLENBQUMsRUFBQTs7d0JBQXJELFNBQXFELENBQUM7Ozs7OztLQUM5RTtJQUxxQixtQkFBYSxnQkFLbEMsQ0FBQTtJQUVELElBQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0lBRTlCLFNBQWdCLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxJQUFjO1FBQzdELE9BQU8sZUFBQyxNQUFNLEdBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFGZSxzQkFBZ0IsbUJBRS9CLENBQUE7SUFPRCxTQUFnQixhQUFhLENBQUMsUUFBZ0I7UUFDNUMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUhlLG1CQUFhLGdCQUc1QixDQUFBO0FBQ0gsQ0FBQyxFQXRDZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBc0NyQiJ9