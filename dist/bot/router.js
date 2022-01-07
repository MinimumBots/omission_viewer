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
    bot
        .on('messageCreate', message => routeMessage(bot, message))
        .on('messageUpdate', (oldMessage, message) => routeMessage(bot, message, oldMessage))
        .on('interactionCreate', interaction => routeInteraction(interaction));
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
    if (!interaction.inCachedGuild())
        return;
    if (interaction.isButton())
        routeButtonInteraction(interaction);
    if (interaction.isMessageContextMenu())
        routeMessageContextMenuInteraction(interaction);
}
function routeButtonInteraction(interaction) {
    const customId = interaction.customId;
    let job = null;
    if (customId === constants_1.ButtonPrefixes.viewPictures)
        job = new ButtonViewPicturesJob_1.ButtonViewPicturesJob(interaction);
    job?.respond()
        .catch(console.error);
}
function routeMessageContextMenuInteraction(interaction) {
    const commandName = interaction.commandName;
    let job = null;
    if (commandName === constants_1.CommandNames.viewPictures)
        job = new ContextMenuViewPicturesJob_1.ContextMenuViewPictureJob(interaction);
    if (commandName === constants_1.CommandNames.removeController)
        job = new RemoveControllerJob_1.RemoveControllerJob(interaction);
    job?.respond()
        .catch(console.error);
}
