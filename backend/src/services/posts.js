import { Post } from '../db/models/post.js'

// creates post in database
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })

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
export async function listPostByAuthor(author, options) {
  return await listPosts({ author }, options)
}

export async function listPostByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  const post = await Post.findById(postId)
  return post
}

export async function updatePost(postId, { title, author, contents, tags }) {
  const post = { $set: { title, author, contents, tags } }

  return await Post.findByIdAndUpdate(postId, post)
}

export async function deletePost(postId) {
  return await Post.deleteOne({ postId })
}
