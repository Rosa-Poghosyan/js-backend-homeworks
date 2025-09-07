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
exports.default = checkPostComments;
const CommentService_1 = __importDefault(require("../services/CommentService")); // hypothetical service
const commentService = new CommentService_1.default();
function checkPostComments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.post) {
            return res.status(400).json({ error: "Post is not loaded" });
        }
        const comments = yield commentService.getCommentsByPostId(req.post.id);
        if (comments.length > 0) {
            return res.status(400).json({
                error: "Cannot delete post with existing comments"
            });
        }
        next();
    });
}
