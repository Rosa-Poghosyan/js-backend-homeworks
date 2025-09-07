import CommentService from '../services/CommentService';
import IComment from '../models/CommentModel';
import {Request, Response} from 'express';

export default class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    
    }

    getCommentsByPostId = async (req: Request, res: Response) => {
        const postId = req.params.postId;
        const comments: IComment[] = await this.commentService.getCommentsByPostId(postId);
        res.json(comments);
    }

    getCommentById = async (req: Request, res: Response) => {
        res.status(200).json(req.comment);
    }

    createComment = async (req: Request, res: Response) => {
        const postId = req.params.postId;
        const {commentData} = req.body;
        if(!commentData) {
            res.status(400).json({error: "Comment can't be empty"})
        }
        const newComment = await this.commentService.createComment(postId, commentData);
        res.json(newComment);

    }

    deleteComment = async (req: Request, res: Response) => {
        const id = req.params.id;
        if(!id) {
            res.status(400).json({error: "Comment id is not specified"})
        }
        const updatedComments = this.commentService.deleteComment;
        res.status(200).json({message: "Comment is successfully removed"})
    }

    deleteAllCommentsByPostId = async (req: Request, res: Response) => {
        const postId = req.params.postId;
        await this.commentService.deleteAllCommentsByPostId(postId);
        res.status(204);
    }
}