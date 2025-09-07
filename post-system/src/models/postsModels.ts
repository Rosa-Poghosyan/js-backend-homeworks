import {writeFile, readFile} from "fs/promises";
import {v4 as uuid} from 'uuid';

const posts = [];
const comments = [];
const postsPath = '../data/posts.json';
const commentsPath = '../data/comments.json';

export const addPost = async (post: string) => {
    const content = await readFile(postsPath, 'utf-8');
    if(!content) return [];
    const parsedContent = JSON.parse(content);
    parsedContent.push({uuid: uuid(), post});
    await writeFile(postsPath, JSON.stringify(parsedContent));
    return parsedContent;
};

export const addComment = async (comment: string, postId: string) => {
    const content = await readFile(commentsPath, 'utf-8');
    if(!content) return [];
    const parsedContent = JSON.parse(content);
    parsedContent.push({uuid: uuid(), comment, postId});
    await writeFile(commentsPath, JSON.stringify(parsedContent));
    return parsedContent;
}
