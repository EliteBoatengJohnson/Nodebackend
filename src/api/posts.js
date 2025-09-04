export const getPosts = async (queryParams = {}) => {
  const url =
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
    new URLSearchParams(queryParams)
  console.log('Fetching from:', url)

  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw error
  }
}

// creating a post to the database
export const createPost = async (token, post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })

  return await res.json()
}
