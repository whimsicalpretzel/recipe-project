import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { jwtDecode } from 'jwt-decode'

export function PostList({ posts = [], onOpenRecipe }) {
  const [token] = useAuth()
  let currentUserId = null

  if (token) {
    const { sub } = jwtDecode(token)
    currentUserId = sub
  }

  return (
    <div className='post-container'>
      {posts.map((post) => {
        let postId = post._id
        let likesCount = post.likesCount ?? 0
        let likedByUser = false

        if (
          currentUserId &&
          post.likedBy &&
          post.likedBy.includes(currentUserId)
        ) {
          likedByUser = true
        }

        return (
          <Post
            key={postId}
            title={post.title}
            author={post.author}
            imgurl={post.imgurl}
            description={post.description}
            ingredients={post.ingredients}
            directions={post.directions}
            postId={postId}
            likesCount={likesCount}
            likedByUser={likedByUser}
            onOpenRecipe={() => onOpenRecipe({ ...post, likedByUser })}
          />
        )
      })}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
  onOpenRecipe: PropTypes.func.isRequired,
}
