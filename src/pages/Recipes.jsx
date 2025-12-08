import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { useSocket } from '../contexts/SocketIOContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { Header } from '../components/Header.jsx'
import { NewRecipeBanner } from '../components/NewRecipeBanner.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPosts } from '../api/posts.js'
import { useEffect, useState } from 'react'
import { RecipeModal } from '../components/RecipeModal.jsx'

export function Recipes() {
  const [token] = useAuth()
  const { socket, status } = useSocket()
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const [selectedPost, setSelectedPost] = useState(null)
  const [newRecipeBanner, setNewRecipeBanner] = useState(null)

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

  const queryClient = useQueryClient()

  const posts = postsQuery.data ?? []

  useEffect(() => {
    if (!socket) return
    if (status !== 'connected') return
    if (!token) return

    function handleRecipeCreated(payload) {
      setNewRecipeBanner(payload)
      queryClient.invalidateQueries({ queryKey: ['posts'] })

      setTimeout(() => {
        setNewRecipeBanner(null)
      }, 6000)
    }

    socket.on('recipe:created', handleRecipeCreated)

    return () => {
      socket.off('recipe:created', handleRecipeCreated)
    }
  }, [socket, status, token, queryClient])

  function handleViewNewRecipe(recipeFromBanner) {
    if (!recipeFromBanner) return

    const newlyPostedRecipe = posts.find((p) => p._id === recipeFromBanner._id)

    if (newlyPostedRecipe) {
      handleOpenRecipe(newlyPostedRecipe)
    }

    setNewRecipeBanner(null)
  }

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <NewRecipeBanner
        recipe={newRecipeBanner}
        onViewBanner={handleViewNewRecipe}
      />
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
