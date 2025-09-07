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
const CommentService_1 = __importDefault(require("../services/CommentService"));
class CommentController {
    constructor() {
        this.getCommentsByPostId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            const comments = yield this.commentService.getCommentsByPostId(postId);
            res.json(comments);
        });
        this.getCommentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(req.comment);
        });
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            const { commentData } = req.body;
            if (!commentData) {
                res.status(400).json({ error: "Comment can't be empty" });
            }
            const newComment = yield this.commentService.createComment(postId, commentData);
            res.json(newComment);
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ error: "Comment id is not specified" });
            }
            const updatedComments = this.commentService.deleteComment;
            res.status(200).json({ message: "Comment is successfully removed" });
        });
        this.deleteAllCommentsByPostId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            yield this.commentService.deleteAllCommentsByPostId(postId);
            res.status(204);
        });
        this.commentService = new CommentService_1.default();
    }
}
exports.default = CommentController;
