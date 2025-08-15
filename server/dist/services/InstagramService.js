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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramService = void 0;
const instagram_url_direct_1 = require("instagram-url-direct");
class InstagramService {
    getMediaPreview(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, instagram_url_direct_1.instagramGetUrl)(url);
                if (!result || !result.url_list || result.url_list.length === 0) {
                    return null;
                }
                console.log("resssss", result);
                const downloadOptions = result.url_list.map((mediaUrl, index) => {
                    var _a;
                    const media = (_a = result.media_details) === null || _a === void 0 ? void 0 : _a[index];
                    const isVideo = (media === null || media === void 0 ? void 0 : media.type) === "video";
                    return {
                        quality: "HD",
                        format: isVideo ? "mp4" : "jpg",
                        downloadUrl: mediaUrl,
                        hasAudio: isVideo,
                    };
                });
                return {
                    title: "Instagram Media",
                    thumbnailUrl: result.url_list[0],
                    source: "Instagram",
                    downloadOptions,
                    mediaItems: downloadOptions,
                };
            }
            catch (error) {
                console.error("InstagramService error:", error);
                return null;
            }
        });
    }
}
exports.InstagramService = InstagramService;
