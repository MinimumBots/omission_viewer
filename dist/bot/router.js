"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupJobs = void 0;
const constants_1 = require("./constants");
const ButtonViewPicturesJob_1 = require("./jobs/ButtonViewPicturesJob");
const PostedPicturesJob_1 = require("./jobs/PostedPicturesJob");
const ContextMenuViewPicturesJob_1 = require("./jobs/ContextMenuViewPicturesJob");
const RemoveControllerJob_1 = require("./jobs/RemoveControllerJob");
const commandData = [
    {
        name: constants_1.CommandNames.viewPictures,
        type: 'MESSAGE',
    },
    {
        name: constants_1.CommandNames.removeController,
        type: 'MESSAGE',
    },
];
function setupJobs(bot) {
    bot.application?.commands.set(commandData)
        .catch(console.error);
    bot.on('messageCreate', message => routeMessage(message));
    bot.on('messageUpdate', (oldMessage, message) => routeMessage(message, oldMessage));
    bot.on('interactionCreate', interaction => routeInteraction(interaction));
}
exports.setupJobs = setupJobs;
function routeMessage(message, oldMessage) {
    const job = new PostedPicturesJob_1.PostedPicturesJob(message, oldMessage);
    job.respond()
        .catch(console.error);
}
function routeInteraction(interaction) {
    if (interaction.isButton())
        routeButtonInteraction(interaction);
    if (interaction.isContextMenu())
        routeContextMenuInteraction(interaction);
}
function routeButtonInteraction(interaction) {
    const customId = interaction.customId;
    let job = null;
    if (customId === constants_1.ButtonPrefixes.viewPictures)
        job = new ButtonViewPicturesJob_1.ButtonViewPicturesJob(interaction);
    job?.respond()
        .catch(console.error);
}
function routeContextMenuInteraction(interaction) {
    const commandName = interaction.commandName;
    let job = null;
    if (commandName === constants_1.CommandNames.viewPictures)
        job = new ContextMenuViewPicturesJob_1.ContextMenuViewPictureJob(interaction);
    if (commandName === constants_1.CommandNames.removeController)
        job = new RemoveControllerJob_1.RemoveControllerJob(interaction);
    job?.respond()
        .catch(console.error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMkNBQTJEO0FBRTNELHdFQUFxRTtBQUVyRSxnRUFBNkQ7QUFDN0Qsa0ZBQThFO0FBQzlFLG9FQUFpRTtBQUVqRSxNQUFNLFdBQVcsR0FBNkI7SUFDNUM7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxZQUFZO1FBQy9CLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxnQkFBZ0I7UUFDbkMsSUFBSSxFQUFFLFNBQVM7S0FDaEI7Q0FDRixDQUFDO0FBRUYsU0FBZ0IsU0FBUyxDQUFDLEdBQVc7SUFDbkMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhCLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQVBELDhCQU9DO0FBRUQsU0FBUyxZQUFZLENBQUMsT0FBbUIsRUFBRSxVQUF1QjtJQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLHFDQUFpQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV2RCxHQUFHLENBQUMsT0FBTyxFQUFFO1NBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxXQUF3QjtJQUNoRCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDeEIsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzdCLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLFdBQThCO0lBQzVELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxHQUFHLEdBQXFCLElBQUksQ0FBQztJQUVqQyxJQUFJLFFBQVEsS0FBSywwQkFBYyxDQUFDLFlBQVk7UUFDMUMsR0FBRyxHQUFHLElBQUksNkNBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFL0MsR0FBRyxFQUFFLE9BQU8sRUFBRTtTQUNYLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsMkJBQTJCLENBQUMsV0FBbUM7SUFDdEUsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUM1QyxJQUFJLEdBQUcsR0FBcUIsSUFBSSxDQUFDO0lBRWpDLElBQUksV0FBVyxLQUFLLHdCQUFZLENBQUMsWUFBWTtRQUMzQyxHQUFHLEdBQUcsSUFBSSxzREFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxJQUFJLFdBQVcsS0FBSyx3QkFBWSxDQUFDLGdCQUFnQjtRQUMvQyxHQUFHLEdBQUcsSUFBSSx5Q0FBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU3QyxHQUFHLEVBQUUsT0FBTyxFQUFFO1NBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=