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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMkNBQTJEO0FBRTNELHdFQUFxRTtBQUVyRSxnRUFBNkQ7QUFDN0Qsa0ZBQThFO0FBQzlFLG9FQUFpRTtBQUVqRSxTQUFnQixTQUFTLENBQUMsR0FBaUI7SUFDekMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9ELEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN6RixHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBTkQsOEJBTUM7QUFFRCxNQUFNLFdBQVcsR0FBNkI7SUFDNUM7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxZQUFZO1FBQy9CLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxnQkFBZ0I7UUFDbkMsSUFBSSxFQUFFLFNBQVM7S0FDaEI7Q0FDRixDQUFDO0FBRUYsU0FBUyxZQUFZLENBQUMsR0FBaUI7SUFDckMsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUFFLE9BQU87SUFFN0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxHQUFpQixFQUFFLE9BQW1CLEVBQUUsVUFBdUI7SUFDbkYsTUFBTSxHQUFHLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTVELEdBQUcsQ0FBQyxPQUFPLEVBQUU7U0FDVixLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLFdBQXdCO0lBQ2hELElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUN4QixzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7UUFDN0IsMkJBQTJCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsV0FBOEI7SUFDNUQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxJQUFJLEdBQUcsR0FBcUIsSUFBSSxDQUFDO0lBRWpDLElBQUksUUFBUSxLQUFLLDBCQUFjLENBQUMsWUFBWTtRQUMxQyxHQUFHLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsMEJBQWMsQ0FBQyxVQUFVLENBQUMsRUFBSSxzQ0FBc0M7UUFDMUYsR0FBRyxHQUFHLElBQUksNkNBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFL0MsR0FBRyxFQUFFLE9BQU8sRUFBRTtTQUNYLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsMkJBQTJCLENBQUMsV0FBbUM7SUFDdEUsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUM1QyxJQUFJLEdBQUcsR0FBcUIsSUFBSSxDQUFDO0lBRWpDLElBQUksV0FBVyxLQUFLLHdCQUFZLENBQUMsWUFBWTtRQUMzQyxHQUFHLEdBQUcsSUFBSSxzREFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxJQUFJLFdBQVcsS0FBSyx3QkFBWSxDQUFDLGdCQUFnQjtRQUMvQyxHQUFHLEdBQUcsSUFBSSx5Q0FBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU3QyxHQUFHLEVBQUUsT0FBTyxFQUFFO1NBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=