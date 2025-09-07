import PostService from "../services/PostService";
import IPost from '../models/PostModel';
import {Request, Response} from "express";

export default class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    getPostById = (req: Request, res: Response) => {
        res.status(200).json(req.post);
    }

    getAllPosts = async (req: Request, res: Response) => {
        const posts: IPost[] = await this.postService.getAllPosts();
        res.json(posts);
    }

    createPost = async (req: Request, res: Response) => {
        const {postData} = req.body;
        if(!postData) {
            res.status(400).json({error: "Post can't be empty"})
        }
        const newPost = await this.postService.createPost(postData);
        res.status(201).json(newPost);
    }

    deletePost = async (req:Request, res: Response) => {
        const postId = req.params.id;
        if(!postId) {
            res.status(400).json({error: "Post id is not specified"})
        }
        const updatedPosts = await this.postService.deletePost(postId);
        res.status(200).json({message: "Post is successfully removed"})
    }
}