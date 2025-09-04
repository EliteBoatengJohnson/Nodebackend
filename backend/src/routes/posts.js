import {
  listAllPosts,
  listPostByAuthor,
  listPostByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { requireAuth } from '../middleware/jwt.js'

export function postRoutes(app) {
  // get request for sorting posts in both ascending and in descending order
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listPostByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  })

  // gets post by id
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params

    try {
      const post = await getPostById(id)
      if (post == null) return res.status(404).end()
      return res.json(post)
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const post = await createPost(req.auth.sub, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error creating post', err)
      return res.status(500).end()
    }
  })

  // update post
  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const post = await updatePost(req.auth.sub, req.params.id, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error updation post', err)
    }
  })

  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.auth.sub, req.params.id)
      if (deletedCount === 0) return res.status(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}
