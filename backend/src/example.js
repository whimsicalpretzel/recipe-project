import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
await initDatabase()

const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Lance Perkins',
  imgurl: 'http://www.notreal.com',
  description: 'An example post for the MongoDB database',
  ingredients: ['item 1', 'item 2'],
  directions: ['step 1', 'step 2'],
  tags: ['tag 1', 'tag 2'],
})

await post.save()
const posts = await Post.find()
console.log(posts)
