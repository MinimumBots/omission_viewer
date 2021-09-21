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
    bot.on('messageCreate', message => routeMessage(message));
    bot.on('messageUpdate', (oldMessage, message) => routeMessage(message, oldMessage));
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
    bot.application?.commands.set(commandData)
        .catch(console.error);
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JvdC9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsMkNBQTJEO0FBRTNELHdFQUFxRTtBQUVyRSxnRUFBNkQ7QUFDN0Qsa0ZBQThFO0FBQzlFLG9FQUFpRTtBQUVqRSxTQUFnQixTQUFTLENBQUMsR0FBVztJQUNuQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRCxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNwRixHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBTkQsOEJBTUM7QUFFRCxNQUFNLFdBQVcsR0FBNkI7SUFDNUM7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxZQUFZO1FBQy9CLElBQUksRUFBRSxTQUFTO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxnQkFBZ0I7UUFDbkMsSUFBSSxFQUFFLFNBQVM7S0FDaEI7Q0FDRixDQUFDO0FBRUYsU0FBUyxZQUFZLENBQUMsR0FBVztJQUMvQixJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQUUsT0FBTztJQUU3RCxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3ZDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE9BQW1CLEVBQUUsVUFBdUI7SUFDaEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFdkQsR0FBRyxDQUFDLE9BQU8sRUFBRTtTQUNWLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsV0FBd0I7SUFDaEQsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQ3hCLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUM3QiwyQkFBMkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsU0FBUyxzQkFBc0IsQ0FBQyxXQUE4QjtJQUM1RCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBQ3RDLElBQUksR0FBRyxHQUFxQixJQUFJLENBQUM7SUFFakMsSUFBSSxRQUFRLEtBQUssMEJBQWMsQ0FBQyxZQUFZO1FBQzFDLEdBQUcsR0FBRyxJQUFJLDZDQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9DLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQywwQkFBYyxDQUFDLFVBQVUsQ0FBQyxFQUFJLHNDQUFzQztRQUMxRixHQUFHLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUvQyxHQUFHLEVBQUUsT0FBTyxFQUFFO1NBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBUywyQkFBMkIsQ0FBQyxXQUFtQztJQUN0RSxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQzVDLElBQUksR0FBRyxHQUFxQixJQUFJLENBQUM7SUFFakMsSUFBSSxXQUFXLEtBQUssd0JBQVksQ0FBQyxZQUFZO1FBQzNDLEdBQUcsR0FBRyxJQUFJLHNEQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELElBQUksV0FBVyxLQUFLLHdCQUFZLENBQUMsZ0JBQWdCO1FBQy9DLEdBQUcsR0FBRyxJQUFJLHlDQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRTdDLEdBQUcsRUFBRSxPQUFPLEVBQUU7U0FDWCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==