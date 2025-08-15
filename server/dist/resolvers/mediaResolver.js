"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.MediaResolver = void 0;
const type_graphql_1 = require("type-graphql");
const MediaPreview_1 = require("../entities/MediaPreview");
const YoutubeService_1 = require("../services/YoutubeService");
const InstagramService_1 = require("../services/InstagramService");
let MediaResolver = class MediaResolver {
    getMediaPreview(url, service) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalizedService = service.trim().toLowerCase();
            console.log('Requested service:', service, 'Normalized:', normalizedService);
            switch (normalizedService) {
                case 'youtube':
                    return new YoutubeService_1.YoutubeService().getMediaPreview(url);
                case 'instagram':
                case 'instagram story':
                    return new InstagramService_1.InstagramService().getMediaPreview(url);
                default:
                    return null;
            }
        });
    }
};
exports.MediaResolver = MediaResolver;
__decorate([
    (0, type_graphql_1.Query)(() => MediaPreview_1.MediaPreview, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('url')),
    __param(1, (0, type_graphql_1.Arg)('service')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MediaResolver.prototype, "getMediaPreview", null);
exports.MediaResolver = MediaResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MediaResolver);
