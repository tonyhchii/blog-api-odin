const { Router } = require("express");
const postRouter = Router();
const postController = require("../controllers/postsController");

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", postController.createPost);

module.exports = postRouter;
