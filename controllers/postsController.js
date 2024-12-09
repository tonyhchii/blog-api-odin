const prisma = require("../db/pool");
const CustomError = require("../utils/customError");

const getAllPosts = (req, res) => {
  console.log(req.user);
};

const getPostByID = async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: true,
    },
  });

  if (!post) {
    throw new CustomError(`Post with ID ${postId} not found`, 404);
  }

  return res.status(200).json(post);
};

const createPost = async (req, res) => {
  const user = req.user;

  const { title, content, isPublished } = req.body;
  if (!title || !content) {
    throw new CustomError("Title and content are required", 400);
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
      isPublished: isPublished === "true",
      createdAt: new Date().toISOString(),
      imageUrl: "default",
    },
  });

  res.status(200).json(post);
};

module.exports = { getAllPosts, createPost };
