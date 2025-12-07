import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { Header } from '../components/Header.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts.js'
import { useState } from 'react'
import { RecipeModal } from '../components/RecipeModal.jsx'

export function Recipes() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [selectedPost, setSelectedPost] = useState(null)

  function handleOpenRecipe(post) {
    setSelectedPost(post)
  }

  function handleCloseModal() {
    setSelectedPost(null)
  }

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <hr />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <br />
      <br />
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt', 'likesCount']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} onOpenRecipe={handleOpenRecipe} />
      <RecipeModal
        post={selectedPost}
        isModalOpen={!!selectedPost}
        onCloseModal={handleCloseModal}
      />
    </div>
  )
}
