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
const FileHandler_1 = require("../utils/FileHandler");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const filePath = path_1.default.join(__dirname, '../../data/posts.json');
class PostService {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, FileHandler_1.readData)(filePath);
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.getAllPosts();
            return posts.find(post => post.id === id);
        });
    }
    createPost(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield (0, FileHandler_1.readData)(filePath);
            const newPost = {
                id: (0, uuid_1.v4)(),
                postData: text,
                date: Date.now()
            };
            posts.push(newPost);
            yield (0, FileHandler_1.writeData)(filePath, posts);
            return newPost;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield (0, FileHandler_1.readData)(filePath);
            const updatedPosts = posts.filter(post => post.id !== id);
            yield (0, FileHandler_1.writeData)(filePath, updatedPosts);
        });
    }
}
exports.default = PostService;
