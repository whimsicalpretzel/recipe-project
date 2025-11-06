import PropTypes from 'prop-types'

export function Post({
  title,
  author,
  imgurl,
  description,
  ingredients,
  directions,
}) {
  return (
    <article>
      <h3>{title}</h3>
      {author && (
        <em>
          Written by <strong>{author}</strong>
        </em>
      )}
      <div>{description}</div>

      {imgurl && <img height='200' width='200' src={imgurl} alt={title} />}

      <br />
      <br />

      {ingredients}

      <br />
      <br />

      {directions}
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
