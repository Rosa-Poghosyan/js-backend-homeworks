"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const loadPost_1 = __importDefault(require("../middlewares/loadPost"));
const validatePost_1 = __importDefault(require("../middlewares/validatePost"));
const checkPostComments_1 = __importDefault(require("../middlewares/checkPostComments"));
const postController = new PostController_1.default();
const router = (0, express_1.Router)();
router.get('/', postController.getAllPosts);
router.post('/add', validatePost_1.default, postController.createPost);
router.get('/post/:id', loadPost_1.default, postController.getPostById);
router.delete('/post/:id', loadPost_1.default, checkPostComments_1.default, postController.deletePost);
exports.default = router;
