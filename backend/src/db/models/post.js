import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    imgurl: String,
    description: String,
    ingredients: [String],
    directions: [String],
    tags: [String],
  },
  { timestamps: true },
)

export const Post = mongoose.model('post', postSchema)
