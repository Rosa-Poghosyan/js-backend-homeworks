"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentsController_1 = __importDefault(require("../controllers/CommentsController"));
const loadComment_1 = __importDefault(require("../middlewares/loadComment"));
const valdateComment_1 = require("../middlewares/valdateComment");
const commentController = new CommentsController_1.default();
const router = (0, express_1.Router)();
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments/add', valdateComment_1.validateComment, commentController.createComment);
router.get('/comments/:id', loadComment_1.default, commentController.getCommentById);
router.delete('/:postId/comments/:id', loadComment_1.default, commentController.deleteComment);
router.delete('/:postId/comments', commentController.deleteAllCommentsByPostId);
exports.default = router;
