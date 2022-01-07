"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerRelatedJob = void 0;
const discord_js_1 = require("discord.js");
const CommonJob_1 = require("./CommonJob");
class ViewerRelatedJob extends CommonJob_1.CommonJob {
    collectImageURLsMap(message) {
        const map = new discord_js_1.Collection();
        message.embeds.forEach(embed => {
            if (!embed.url || !embed.image)
                return;
            const imageURLs = map.get(embed.url) ?? [];
            map.set(embed.url, imageURLs.concat(embed.image.url));
        });
        return map;
    }
}
exports.ViewerRelatedJob = ViewerRelatedJob;
