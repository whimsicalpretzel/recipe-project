import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [imgurl, setImgurl] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [directions, setDirections] = useState('')

  const [token] = useAuth()

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, {
        title,
        imgurl,
        description,
        ingredients,
        directions,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setTitle('')
      setImgurl('')
      setDescription('')
      setIngredients('')
      setDirections('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to add a new recipe.</div>

  return (
    <form onSubmit={handleSubmit} className='recipe-form'>
      <div>
        <label htmlFor='create-title'>
          Title:
          <input
            type='text'
            name='create-title'
            id='create-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor='image-url'>
          Recipe Picture Link:
          <input
            type='url'
            name='image-url'
            id='image-url'
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
          />
        </label>
      </div>

      <label htmlFor='ingredients-text'>
        Ingredients:
        <textarea
          name='ingredients-text'
          id='ingredients-text'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </label>

      <label htmlFor='directions-text'>
        Directions:
        <textarea
          name='directions-text'
          id='directions-text'
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />
      </label>

      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
        className='submit-button'
      />
      {createPostMutation.isSuccess ? <>Post created successfully!</> : null}
    </form>
  )
}
