import IPost from "../models/PostModel";
import IComment from '../models/CommentModel';

declare global {
  namespace Express {
    interface Request {
      post?: IPost;
      comment?: IComment;
    }
  }
}