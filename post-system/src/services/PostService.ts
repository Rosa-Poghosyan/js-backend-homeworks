import {readData, writeData} from '../utils/FileHandler';
import path from 'path';
import IPost from '../models/PostModel';
import {v4 as uuid} from 'uuid'

const filePath = path.join(__dirname, '../../data/posts.json')

export default class PostService {

    async getAllPosts(): Promise<IPost[]> {
        return await readData<IPost>(filePath);
    }

    async getPostById(id: string): Promise<IPost | undefined> {
        const posts = await this.getAllPosts();
        return posts.find(post => post.id === id);
    }

    async createPost(text: string): Promise<IPost> {
        const posts = await readData<IPost>(filePath);
        const newPost: IPost = {
            id: uuid(),
            postData: text,
            date: Date.now()
        }
        posts.push(newPost);
        await writeData<IPost>(filePath, posts);
        return newPost;
    }

    async deletePost(id: string): Promise<void> {
        const posts = await readData<IPost>(filePath);
        const updatedPosts = posts.filter(post => post.id !== id);
        await writeData<IPost>(filePath, updatedPosts);

    }

}