import {Router} from 'express';
import PostController from '../controllers/PostController';
import loadPost from "../middlewares/loadPost";
import validatePost from "../middlewares/validatePost";
import checkPostComments from "../middlewares/checkPostComments";

const postController = new PostController();
const router = Router();
router.get('/', postController.getAllPosts);
router.post('/add', validatePost, postController.createPost);
router.get('/post/:id', loadPost, postController.getPostById)
router.delete('/post/:id', loadPost, checkPostComments, postController.deletePost);


export default router;