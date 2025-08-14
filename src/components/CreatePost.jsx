import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContent] = useState('')

  //invalidationg queries for post refresh
  const queryClient = useQueryClient()

  // creates mutation to allow multple form data submission
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),

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
        <label htmlFor='create-author'>Author:</label>{' '}
        {/* Added missing label text */}
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
