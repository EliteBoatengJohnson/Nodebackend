import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'
// creates post in database
export async function createPost(userId, { title, contents, tags }) {
  // added a user id to associate post with a user
  const post = new Post({ title, author: userId, contents, tags })

  return await post.save()
}
// retrieves posts
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = -1 } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}
// gets lists by author
export async function listPostByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  const post = await Post.findById(postId)
  return post
}

export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ postId, author: userId })
}
