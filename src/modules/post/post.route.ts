import express from 'express';
import { PostController } from './post.controller';
import multer from "multer";

const router = express.Router();

const upload = multer();

router.get("/stats", PostController.getBlogStat)

router.post(
    "/",
    PostController.createPost
)
// router.post(
//     "/", upload.single("featuredImage"),
//     PostController.createPost
// )
router.get("/", PostController.getAllPosts);
// router.get("/:id", PostController.getPostById);
router.get("/:slug", PostController.getPostBySlug);
router.patch("/:id", PostController.updatePost);
// router.patch("/:id", upload.single("featuredImage"), PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export const PostRouter = router;