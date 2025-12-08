import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { PostLikes } from './PostLikes.jsx'

export function Post({
  title,
  author: userId,
  imgurl,
  postId,
  likesCount,
  likedByUser,
  onOpenRecipe,
}) {
  return (
    <article className='recipe-card'>
      <h3>{title}</h3>
      {userId && (
        <span>
          Written by <User id={userId} />
        </span>
      )}
      {imgurl && (
        <img
          height='200'
          width='200'
          src={imgurl}
          alt={title}
          style={{ display: 'block' }}
        />
      )}
      <PostLikes
        postId={postId}
        likesCount={likesCount}
        likedByUser={likedByUser}
      />
      <button className='view-recipe-modal' onClick={onOpenRecipe}>
        See this recipe
      </button>
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  imgurl: PropTypes.string,
  postId: PropTypes.string,
  likesCount: PropTypes.number,
  likedByUser: PropTypes.bool,
  onOpenRecipe: PropTypes.func,
}
