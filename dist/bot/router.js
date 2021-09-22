"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupJobs = void 0;
const constants_1 = require("./constants");
const ButtonViewPicturesJob_1 = require("./jobs/ButtonViewPicturesJob");
const PostedPicturesJob_1 = require("./jobs/PostedPicturesJob");
const ContextMenuViewPicturesJob_1 = require("./jobs/ContextMenuViewPicturesJob");
const RemoveControllerJob_1 = require("./jobs/RemoveControllerJob");
function setupJobs(bot) {
    syncCommands(bot);
    PostedPicturesJob_1.PostedPicturesJob.sweepMessageIds(bot);
    bot.on('messageCreate', message => routeMessage(bot, message));
    bot.on('messageUpdate', (oldMessage, message) => routeMessage(bot, message, oldMessage));
    bot.on('interactionCreate', interaction => routeInteraction(interaction));
}
exports.setupJobs = setupJobs;
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
function syncCommands(bot) {
    if (bot.shard && !bot.shard.ids.some(id => id === 0))
        return;
    bot.application.commands.set(commandData)
        .catch(console.error);
}
function routeMessage(bot, message, oldMessage) {
    const job = new PostedPicturesJob_1.PostedPicturesJob(bot, message, oldMessage);
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
    if (customId.startsWith(constants_1.ButtonPrefixes.viewImages)) // Will be removed in the next update.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMkNBQTJEO0FBRTNELHdFQUFxRTtBQUVyRSxnRUFBNkQ7QUFDN0Qsa0ZBQThFO0FBQzlFLG9FQUFpRTtBQUVqRSxTQUFnQixTQUFTLENBQUMsR0FBaUI7SUFDekMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLHFDQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2QyxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvRCxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQVBELDhCQU9DO0FBRUQsTUFBTSxXQUFXLEdBQTZCO0lBQzVDO1FBQ0UsSUFBSSxFQUFFLHdCQUFZLENBQUMsWUFBWTtRQUMvQixJQUFJLEVBQUUsU0FBUztLQUNoQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLHdCQUFZLENBQUMsZ0JBQWdCO1FBQ25DLElBQUksRUFBRSxTQUFTO0tBQ2hCO0NBQ0YsQ0FBQztBQUVGLFNBQVMsWUFBWSxDQUFDLEdBQWlCO0lBQ3JDLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFBRSxPQUFPO0lBRTdELEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsR0FBaUIsRUFBRSxPQUFtQixFQUFFLFVBQXVCO0lBQ25GLE1BQU0sR0FBRyxHQUFHLElBQUkscUNBQWlCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUU1RCxHQUFHLENBQUMsT0FBTyxFQUFFO1NBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxXQUF3QjtJQUNoRCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDeEIsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzdCLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLFdBQThCO0lBQzVELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxHQUFHLEdBQXFCLElBQUksQ0FBQztJQUVqQyxJQUFJLFFBQVEsS0FBSywwQkFBYyxDQUFDLFlBQVk7UUFDMUMsR0FBRyxHQUFHLElBQUksNkNBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLDBCQUFjLENBQUMsVUFBVSxDQUFDLEVBQUksc0NBQXNDO1FBQzFGLEdBQUcsR0FBRyxJQUFJLDZDQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRS9DLEdBQUcsRUFBRSxPQUFPLEVBQUU7U0FDWCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRCxTQUFTLDJCQUEyQixDQUFDLFdBQW1DO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDNUMsSUFBSSxHQUFHLEdBQXFCLElBQUksQ0FBQztJQUVqQyxJQUFJLFdBQVcsS0FBSyx3QkFBWSxDQUFDLFlBQVk7UUFDM0MsR0FBRyxHQUFHLElBQUksc0RBQXlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsSUFBSSxXQUFXLEtBQUssd0JBQVksQ0FBQyxnQkFBZ0I7UUFDL0MsR0FBRyxHQUFHLElBQUkseUNBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0MsR0FBRyxFQUFFLE9BQU8sRUFBRTtTQUNYLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9