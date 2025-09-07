import {Request, Response, NextFunction} from "express";
import PostService from "../services/PostService";

const postService = new PostService();

export default async function loadPost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).json({error: "Post ID is required"});
    }
    const post = await postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({message: "Post not found"});
    }

    req.post = post;
    next();
}