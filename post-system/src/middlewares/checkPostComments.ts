import {Request, Response, NextFunction} from "express";
import CommentService from "../services/CommentService"; // hypothetical service
import IComment from "../models/CommentModel";

const commentService = new CommentService();

export default async function checkPostComments(req: Request, res: Response, next: NextFunction) {
    if (!req.post) {
        return res.status(400).json({error: "Post is not loaded"});
    }

    const comments: IComment[] = await commentService.getCommentsByPostId(req.post.id);
    if (comments.length > 0) {
        return res.status(400).json({
            error: "Cannot delete post with existing comments"
        });
    }
    next();
}