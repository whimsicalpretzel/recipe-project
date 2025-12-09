import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { PostLikes } from './PostLikes.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { jwtDecode } from 'jwt-decode'

export function RecipeModal({ post, isModalOpen, onCloseModal }) {
  const [token] = useAuth()

  if (!isModalOpen || !post) return null
  let currentUserId = null
  let likedByUser = false

  if (token) {
    const { sub } = jwtDecode(token)
    currentUserId = sub
  }

  if (currentUserId && post.likedBy && post.likedBy.includes(currentUserId)) {
    likedByUser = true
  }

  return (
    <div className='modal-box'>
      <div className='recipe-modal'>
        <button className='close-modal' onClick={onCloseModal}>
          Close Recipe
        </button>
        <h3>{post.title}</h3>
        {post.author && (
          <span>
            Written by <User id={post.author} />
          </span>
        )}
        {post.imgurl && <img src={post.imgurl} alt={post.title} />}
        <p>Ingredients:</p>
        <p>{post.ingredients}</p>
        <p>Directions:</p>
        <p>{post.directions}</p>
        <PostLikes
          postId={post._id}
          likesCount={post.likesCount ?? 0}
          likedByUser={likedByUser}
        />
      </div>
    </div>
  )
}

RecipeModal.propTypes = {
  post: PropTypes.object,
  isModalOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
}
