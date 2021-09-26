"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerRelatedJob = void 0;
const CommonJob_1 = require("./CommonJob");
class ViewerRelatedJob extends CommonJob_1.CommonJob {
    collectImageURLsChunks(message) {
        const embeds = message.embeds.slice();
        return message.embeds.reduce((chunks, targetEmbed, i) => {
            if (!embeds[i])
                return chunks;
            const urls = embeds.reduce((urls, embed, i) => {
                if (!embed?.image || targetEmbed.url !== embed.url)
                    return urls;
                embeds[i] = null;
                return urls.concat(embed.image.url);
            }, []);
            return urls.length ? chunks.concat([urls]) : chunks;
        }, []);
    }
}
exports.ViewerRelatedJob = ViewerRelatedJob;
