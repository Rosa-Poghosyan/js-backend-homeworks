"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComment = validateComment;
function validateComment(req, res, next) {
    if (!req.body.commentData || req.body.commentData.trim() === "") {
        return res.status(400).json({ message: "Comment cannot be empty" });
    }
    next();
}
