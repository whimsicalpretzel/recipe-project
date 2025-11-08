import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Post({
  title,
  author: userId,
  imgurl,
  description,
  ingredients,
  directions,
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
}
