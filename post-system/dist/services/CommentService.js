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
const filePath = path_1.default.join(__dirname, '../../data/comments.json');
class CommentService {
    getCommentsByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield (0, FileHandler_1.readData)(filePath);
            return comments
                .filter(comment => comment.postId === postId)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield (0, FileHandler_1.readData)(filePath);
            return comments.find(comment => comment.id === id);
        });
    }
    createComment(postId, commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield (0, FileHandler_1.readData)(filePath);
            const newComment = {
                id: (0, uuid_1.v4)(),
                commentData,
                postId,
                date: Date.now()
            };
            comments.push(newComment);
            yield (0, FileHandler_1.writeData)(filePath, comments);
            return newComment;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield (0, FileHandler_1.readData)(filePath);
            const updatedComments = comments.filter(comment => comment.id !== id);
            yield (0, FileHandler_1.writeData)(filePath, updatedComments);
        });
    }
    deleteAllCommentsByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.getCommentsByPostId(postId);
            const updatedComments = comments.filter(comment => comment.postId !== postId);
            yield (0, FileHandler_1.writeData)(filePath, updatedComments);
        });
    }
}
exports.default = CommentService;
