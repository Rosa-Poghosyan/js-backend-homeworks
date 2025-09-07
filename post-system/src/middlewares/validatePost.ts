import { Request, Response, NextFunction } from "express";

export default function validatePost(req: Request, res: Response, next: NextFunction) {
      if (!req.body.postData || req.body.postData.trim() === "") {
    return res.status(400).json({ message: "Post cannot be empty" });
  }
  next();
}