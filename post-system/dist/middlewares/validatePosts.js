"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = validatePost;
function validatePost(req, res, next) {
    if (!req.body.postData || req.body.postData.trim() === "") {
        return res.status(400).json({ message: "Post cannot be empty" });
    }
    next();
}
