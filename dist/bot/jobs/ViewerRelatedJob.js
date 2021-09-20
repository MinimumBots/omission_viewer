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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld2VyUmVsYXRlZEpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ib3Qvam9icy9WaWV3ZXJSZWxhdGVkSm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDJDQUF3QztBQUV4QyxNQUFzQixnQkFBaUIsU0FBUSxxQkFBUztJQUM1QyxzQkFBc0IsQ0FBQyxPQUFtQjtRQUNsRCxNQUFNLE1BQU0sR0FBNEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUvRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLE1BQU0sQ0FBQztZQUU5QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRztvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFFaEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUFFLEVBQWMsQ0FBQyxDQUFDO1lBRW5CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0RCxDQUFDLEVBQUUsRUFBZ0IsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQWpCRCw0Q0FpQkMifQ==