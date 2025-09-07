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
const PostService_1 = __importDefault(require("../services/PostService"));
class PostController {
    constructor() {
        this.getPostById = (req, res) => {
            res.status(200).json(req.post);
        };
        this.getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postService.getAllPosts();
            res.json(posts);
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { postData } = req.body;
            if (!postData) {
                res.status(400).json({ error: "Post can't be empty" });
            }
            const newPost = yield this.postService.createPost(postData);
            res.status(201).json(newPost);
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.id;
            if (!postId) {
                res.status(400).json({ error: "Post id is not specified" });
            }
            const updatedPosts = yield this.postService.deletePost(postId);
            res.status(200).json({ message: "Post is successfully removed" });
        });
        this.postService = new PostService_1.default();
    }
}
exports.default = PostController;
