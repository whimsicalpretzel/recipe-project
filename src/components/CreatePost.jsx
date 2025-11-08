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
            style={{ marginLeft: '5px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <br />
      <div>
        <label htmlFor='image-url'>
          Recipe Picture Link:
          <input
            type='url'
            name='image-url'
            id='image-url'
            style={{ marginLeft: '5px' }}
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
          />
        </label>
      </div>
      <br />
      {/*<div>
        <label htmlFor='recipe-description'>
          Recipe Description:
          <input
            type='text'
            name='recipe-description'
            id='recipe-description'
            style={{ marginLeft: '5px'}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>*/}
      <br />
      <label htmlFor='ingredients-text'>
        Ingredients:
        <textarea
          name='ingredients-text'
          id='ingredients-text'
          style={{ marginLeft: '5px' }}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor='directions-text'>
        Directions:
        <textarea
          name='directions-text'
          id='directions-text'
          style={{ marginLeft: '5px' }}
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
        />
      </label>
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
        className='submit-button'
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
