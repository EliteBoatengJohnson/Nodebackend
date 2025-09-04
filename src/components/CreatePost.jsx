import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'
import { useAuth } from '../contexts/AuthContext.jsx'
export function CreatePost() {
  const [title, setTitle] = useState('')
  const [token] = useAuth()
  const [contents, setContent] = useState('')

  //invalidationg queries for post refresh
  const queryClient = useQueryClient()

  // creates mutation to allow multple form data submission
  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),

    onSuccess: (Data) => {
      queryClient.invalidateQueries(['posts'])
      console.log('Post created', Data)
    },
    onError: (error) => {
      console.log('Failed to create Data', error)
    },
  })

  // event to handle submission of form to the backend using the fetch api
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  if (!token) return <div>Please log in to create a new posts.</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title:</label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-content'>Content:</label>{' '}
        {/* Added label for textarea */}
        <textarea
          name='create-content'
          id='create-content'
          value={contents}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
