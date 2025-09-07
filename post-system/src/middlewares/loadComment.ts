import {Request, Response, NextFunction} from "express";
import CommentService from "../services/CommentService";

const commentService = new CommentService();

export default async function loadComment(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({error: "Comment id is required"});
    }
    const comment = await commentService.getCommentById(id);
    if (!comment) {
        return res.status(404).json({message: "Comment not found"});
    }

    req.comment = comment;
    next();
}