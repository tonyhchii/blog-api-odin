const prisma = require("../db/pool");
const CustomError = require("../utils/customError");

const getAllPosts = async (req, res) => {
  const { sort = "createdAt", order = "desc", search = "" } = req.query;

  const { user } = req;

  const validSortFields = ["createdAt", "title", "comments"];
  const validOrderValues = ["asc", "desc"];

  if (!validSortFields.includes(sort)) {
    throw new CustomError(`Invalid sort field: ${sort}`, 400);
  }

  if (!validOrderValues.includes(order)) {
    throw new CustomError(`Invalid order value: ${order}`, 400);
  }

  const where = {
    title: {
      contains: search,
      mode: "insensitive",
    },
    ...(user ? { authorId: user.id } : { isPublished: true }),
  };

  let orderBy;
  if (sort === "comments") {
    orderBy = { [sort]: { _count: order } };
  } else {
    orderBy = { [sort]: order };
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy,
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return res.status(200).json(posts);
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
