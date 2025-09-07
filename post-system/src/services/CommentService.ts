import {readData, writeData} from '../utils/FileHandler';
import path from 'path';
import IComment from '../models/CommentModel';
import {v4 as uuid} from 'uuid'

const filePath = path.join(__dirname, '../../data/comments.json');

 export default class CommentService {

    async getCommentsByPostId(postId: string): Promise<IComment[]> {
        const comments = await readData<IComment>(filePath);
        return comments
        .filter(comment => comment.postId === postId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    }

    async getCommentById(id: string): Promise<IComment | undefined> {
        const comments = await readData<IComment>(filePath);
        return comments.find(comment => comment.id === id);
    }

    async createComment(postId:string, commentData: string): Promise<IComment> {
        const comments = await readData<IComment>(filePath);
        const newComment: IComment = {
            id: uuid(),
            commentData,
            postId,
            date: Date.now()
        }
        comments.push(newComment);
        await writeData<IComment>(filePath, comments);
        return newComment;
    }

    async deleteComment(id: string): Promise<void> {
        const comments = await readData<IComment>(filePath);
        const updatedComments = comments.filter(comment => comment.id !== id);
        await writeData(filePath, updatedComments);
    }

     async deleteAllCommentsByPostId(postId: string): Promise<void> {
        const comments = await this.getCommentsByPostId(postId);
        const updatedComments = comments.filter(comment => comment.postId !== postId);
        await writeData(filePath, updatedComments);
    }

 }