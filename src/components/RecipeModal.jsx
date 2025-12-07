import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { PostLikes } from './PostLikes.jsx'

export function RecipeModal({ post, isModalOpen, onCloseModal }) {
  if (!isModalOpen || !post) return null

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
        {post.imgurl && (
          <img
            height='200'
            width='200'
            src={post.imgurl}
            alt={post.title}
            style={{ display: 'block' }}
          />
        )}
        <p>Ingredients:</p>
        <p>{post.ingredients}</p>
        <p>Directions:</p>
        <p>{post.directions}</p>
        <PostLikes
          postId={post._id}
          likesCount={post.likesCount}
          likedByUser={post.likedByUser}
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
