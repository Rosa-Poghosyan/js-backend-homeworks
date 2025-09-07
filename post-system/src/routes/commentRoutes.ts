import {Router} from 'express';
import CommentController from "../controllers/CommentsController";
import loadComment from "../middlewares/loadComment";
import {validateComment} from "../middlewares/valdateComment";


const commentController = new CommentController();
const router = Router();
router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments/add', validateComment, commentController.createComment);
router.get('/comments/:id', loadComment, commentController.getCommentById)
router.delete('/:postId/comments/:id', loadComment,  commentController.deleteComment);
router.delete('/:postId/comments',  commentController.deleteAllCommentsByPostId);


export default router;