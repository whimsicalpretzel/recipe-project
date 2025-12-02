import PropTypes from 'prop-types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { toggleLike } from '../api/posts.js'
import likedImg from '../assets/liked.png'
import notLikedImg from '../assets/not-liked.png'

export function PostLikes(props) {
  const [token] = useAuth()
  const [isLiked, setIsLiked] = useState(props.likedByUser)
  const [currentLikes, setCurrentLikes] = useState(props.likesCount)

  const likePostMutation = useMutation({
    mutationFn: () => toggleLike(token, props.postId),
    onSuccess: (updatedPost) => {
      setCurrentLikes(updatedPost.likesCount)
      setIsLiked((prevLiked) => !prevLiked)
    },
  })

  function handleLikeClick() {
    likePostMutation.mutate()
  }

  return (
    <div className='likes-container'>
      <button disabled={!token} onClick={handleLikeClick} className='like-btn'>
        {token && isLiked ? (
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
        {currentLikes} {currentLikes === 1 ? 'like' : 'likes'}
      </span>
    </div>
  )
}

PostLikes.propTypes = {
  postId: PropTypes.string,
  likesCount: PropTypes.number,
  likedByUser: PropTypes.bool,
}
