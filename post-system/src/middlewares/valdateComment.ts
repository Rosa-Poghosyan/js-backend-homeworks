import { Request, Response, NextFunction } from "express";

export function validateComment(req: Request, res: Response, next: NextFunction) {
      if (!req.body.commentData || req.body.commentData.trim() === "") {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }
  next();
}