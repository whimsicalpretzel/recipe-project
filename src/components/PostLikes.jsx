import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { toggleLike } from '../api/posts.js'
import likedImg from '../assets/liked.png'
import notLikedImg from '../assets/not-liked.png'

export function PostLikes({ postId, likesCount, likedByUser }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const likePostMutation = useMutation({
    mutationFn: () => toggleLike(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  function handleLikeClick() {
    likePostMutation.mutate()
  }

  return (
    <div className='likes-container'>
      <button disabled={!token} onClick={handleLikeClick} className='like-btn'>
        {token && likedByUser ? (
          <img src={likedImg} alt='Recipe liked' className='like-img' />
        ) : (
          <img
            src={notLikedImg}
            alt='Click to like recipe'
            className='like-img'
          />
        )}
      </button>

      <span>
        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
      </span>
    </div>
  )
}

PostLikes.propTypes = {
  postId: PropTypes.string,
  likesCount: PropTypes.number,
  likedByUser: PropTypes.bool,
}
