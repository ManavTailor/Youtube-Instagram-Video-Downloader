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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
class YoutubeService {
    getMediaPreview(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoInfo = yield ytdl_core_1.default.getInfo(url, {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                    },
                },
            });
            const { videoDetails } = videoInfo;
            const qualityMap = new Map();
            videoInfo.formats
                .filter((format) => format.qualityLabel)
                .forEach((format) => {
                if (!qualityMap.has(format.qualityLabel)) {
                    qualityMap.set(format.qualityLabel, {
                        quality: format.qualityLabel,
                        format: format.container,
                        downloadUrl: format.url,
                        hasAudio: format.hasAudio,
                    });
                }
            });
            const downloadOptions = Array.from(qualityMap.values());
            const audioFormat = ytdl_core_1.default.chooseFormat(videoInfo.formats, {
                quality: 'highestaudio',
                filter: 'audioonly',
            });
            return {
                title: videoDetails.title,
                thumbnailUrl: videoDetails.thumbnails[0].url,
                duration: parseInt(videoDetails.lengthSeconds, 10),
                source: 'YouTube',
                downloadOptions,
                audioUrl: audioFormat ? audioFormat.url : undefined,
            };
        });
    }
}
exports.YoutubeService = YoutubeService;
