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
exports.Utils = void 0;
var Utils;
(function (Utils) {
    function fetchMessage(bot, channelID, messageID) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, message, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        channel = bot.channels.cache.get("" + BigInt(channelID));
                        if (!(channel === null || channel === void 0 ? void 0 : channel.isText()))
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel.messages.fetch("" + BigInt(messageID))];
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
    function deleteMessage(bot, channelID, messageID) {
        return __awaiter(this, void 0, void 0, function () {
            var channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = bot.channels.cache.get("" + BigInt(channelID));
                        if (!(channel === null || channel === void 0 ? void 0 : channel.isText())) return [3 /*break*/, 2];
                        return [4 /*yield*/, channel.messages.delete("" + BigInt(messageID))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    Utils.deleteMessage = deleteMessage;
})(Utils = exports.Utils || (exports.Utils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBaUIsS0FBSyxDQXNCckI7QUF0QkQsV0FBaUIsS0FBSztJQUNwQixTQUFzQixZQUFZLENBQ2hDLEdBQVcsRUFBRSxTQUE2QixFQUFFLFNBQTZCOzs7Ozs7d0JBRW5FLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFHLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxDQUFDLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sRUFBRSxDQUFBOzRCQUFFLHNCQUFPOzs7O3dCQUdiLHFCQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBRyxDQUFDLEVBQUE7O3dCQUE5RCxPQUFPLEdBQUcsU0FBb0Q7d0JBQ3BFLHNCQUFPLE9BQU8sRUFBQzs7O3dCQUdmLHNCQUFPOzs7OztLQUVWO0lBYnFCLGtCQUFZLGVBYWpDLENBQUE7SUFFRCxTQUFzQixhQUFhLENBQ2pDLEdBQVcsRUFBRSxTQUE2QixFQUFFLFNBQTZCOzs7Ozs7d0JBRW5FLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFHLENBQUMsQ0FBQzs2QkFDM0QsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFFLENBQUEsRUFBakIsd0JBQWlCO3dCQUFFLHFCQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBRyxDQUFDLEVBQUE7O3dCQUFyRCxTQUFxRCxDQUFDOzs7Ozs7S0FDOUU7SUFMcUIsbUJBQWEsZ0JBS2xDLENBQUE7QUFDSCxDQUFDLEVBdEJnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFzQnJCIn0=