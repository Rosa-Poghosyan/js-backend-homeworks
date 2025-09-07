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
exports.addComment = exports.addPost = void 0;
const promises_1 = require("fs/promises");
const uuid_1 = require("uuid");
const posts = [];
const comments = [];
const postsPath = '../data/posts.json';
const commentsPath = '../data/comments.json';
const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield (0, promises_1.readFile)(postsPath, 'utf-8');
    if (!content)
        return [];
    const parsedContent = JSON.parse(content);
    parsedContent.push({ uuid: (0, uuid_1.v4)(), post });
    yield (0, promises_1.writeFile)(postsPath, JSON.stringify(parsedContent));
    return parsedContent;
});
exports.addPost = addPost;
const addComment = (comment, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield (0, promises_1.readFile)(commentsPath, 'utf-8');
    if (!content)
        return [];
    const parsedContent = JSON.parse(content);
    parsedContent.push({ uuid: (0, uuid_1.v4)(), comment, postId });
    yield (0, promises_1.writeFile)(commentsPath, JSON.stringify(parsedContent));
    return parsedContent;
});
exports.addComment = addComment;
