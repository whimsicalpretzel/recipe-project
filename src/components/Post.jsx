import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { PostLikes } from './PostLikes.jsx'

export function Post({
  title,
  author: userId,
  imgurl,
  description,
  ingredients,
  directions,
  postId,
  likesCount,
  likedByUser,
}) {
  return (
    <article className='recipe-card'>
      <h3>{title}</h3>
      {userId && (
        <span>
          Written by <User id={userId} />
        </span>
      )}
      <div style={{ display: 'none' }}>{description}</div>
      {imgurl && (
        <img
          height='200'
          width='200'
          src={imgurl}
          alt={title}
          style={{ display: 'block' }}
        />
      )}
      <p>Ingredients:</p>
      <p>{ingredients}</p>
      <p>Directions:</p>
      <p>{directions}</p>
      <PostLikes
        postId={postId}
        likesCount={likesCount}
        likedByUser={likedByUser}
      />
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  description: PropTypes.string,
  imgurl: PropTypes.string,
  ingredients: PropTypes.string,
  directions: PropTypes.string,
  postId: PropTypes.string,
  likesCount: PropTypes.number,
  likedByUser: PropTypes.bool,
}
