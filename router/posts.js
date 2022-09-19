const express = require("express")

const router = express.Router()
const Post = require("../models/Posts")

// Retrieve all routes
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (error) {
    res.send({ msg: error })
  }
})

//Get specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.status(200).json(post)
  } catch (error) {
    res.send({ msg: error })
  }
})

//Create Post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })

  try {
    const savedPost = await post.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.send({ msg: error })
  }
})

//Delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.deleteMany({ _id: req.params.postId })
    res.status(200).json(removedPost)
  } catch (error) {
    res.send({ msg: error })
  }
})

//update post
router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
        },
      }
    )
    res.status(200).json(updatedPost)
  } catch (error) {
    res.send({ msg: error })
  }
  res.json({ body: req.body, post: req.params.postId })
})

module.exports = router
