"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactor = void 0;
const utilities_1 = require("../utilities");
const ButtonReactor_1 = require("./ButtonReactor");
const generators_1 = require("./generators");
var MessageReactor;
(function (MessageReactor) {
    function initialize(bot) {
        bot.on('messageCreate', message => resolveMessage(message));
        bot.on('messageUpdate', (oldMessage, message) => resolveUpdatedMessage(oldMessage, message));
    }
    MessageReactor.initialize = initialize;
    const respondedMessageIds = new Set();
    function resolveMessage(message) {
        if (countHiddenImages(message))
            sendController(message)
                .then(() => respondedMessageIds.add(message.id))
                .catch(console.error);
        else
            utilities_1.removeMessageCache(message);
    }
    function resolveUpdatedMessage(oldMessage, message) {
        if (!respondedMessageIds.has(message.id) && !countHiddenImages(oldMessage))
            resolveMessage(message);
    }
    function countHiddenImages(message) {
        return generators_1.collectImageURLsChunks(message)
            .reduce((count, urls) => count + urls.length - 1, 0);
    }
    const controllerComponents = [
        {
            type: 'ACTION_ROW',
            components: [
                {
                    type: 'BUTTON',
                    style: 'SUCCESS',
                    label: 'すべての画像を表示',
                    customId: ButtonReactor_1.ButtonReactor.prefixes.viewImages,
                },
            ],
        },
    ];
    async function sendController(laxMessage) {
        const message = await laxMessage.fetch();
        await message.reply({
            content: 'このメッセージ内のすべての画像をチャンネルの一番下に表示します',
            components: controllerComponents,
            allowedMentions: { repliedUser: false },
        });
    }
})(MessageReactor = exports.MessageReactor || (exports.MessageReactor = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZVJlYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L3JlYWN0b3JzL01lc3NhZ2VSZWFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU9BLDRDQUFrRDtBQUNsRCxtREFBZ0Q7QUFDaEQsNkNBQXNEO0FBRXRELElBQWlCLGNBQWMsQ0F1RDlCO0FBdkRELFdBQWlCLGNBQWM7SUFDN0IsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7UUFDcEMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsRUFBRSxDQUNKLGVBQWUsRUFDZixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FDcEUsQ0FBQztJQUNKLENBQUM7SUFOZSx5QkFBVSxhQU16QixDQUFBO0lBRUQsTUFBTSxtQkFBbUIsR0FBbUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUV0RCxTQUFTLGNBQWMsQ0FBQyxPQUFtQjtRQUN6QyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUM1QixjQUFjLENBQUMsT0FBTyxDQUFDO2lCQUNwQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDL0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFFeEIsOEJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFNBQVMscUJBQXFCLENBQzVCLFVBQXNCLEVBQUUsT0FBbUI7UUFFM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFDeEUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTLGlCQUFpQixDQUFDLE9BQW1CO1FBQzVDLE9BQU8sbUNBQXNCLENBQUMsT0FBTyxDQUFDO2FBQ25DLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBOEI7UUFDdEQ7WUFDRSxJQUFJLEVBQUUsWUFBWTtZQUNsQixVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEtBQUssRUFBRSxXQUFXO29CQUNsQixRQUFRLEVBQUUsNkJBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVTtpQkFDNUM7YUFDRjtTQUNGO0tBQ0YsQ0FBQztJQUVGLEtBQUssVUFBVSxjQUFjLENBQUMsVUFBc0I7UUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFekMsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxpQ0FBaUM7WUFDMUMsVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxlQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7QUFDSCxDQUFDLEVBdkRnQixjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQXVEOUIifQ==