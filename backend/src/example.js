import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const post = new Post({
  title: 'Birria',
  author: 'Pedro Pascal',
  imgurl: 'https://tinyurl.com/birria-for-project',
  description: 'Slow-cooker Biria',
  ingredients:
    'Beef chuck roast, spices, onion, garlic, beef broth, dried chiles, bay leaves, oil, tomato, cinnamon, vinegar, water',
  directions:
    'Season the beef with salt, pepper, spices. Sear the beef in a pan with oil and then place in slow cooker. Blend everything else until mostly smooth and place in slow cooker. Slow cook on low until beef is fall apart tender. Shred and return to slow cooker. Wait 5 minutes then serve. ',
  tags: ['birria', 'dinner', 'Chilean'],
})

await post.save()
const posts = await Post.find()
console.log(posts)
