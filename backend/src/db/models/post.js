import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    imgurl: String,
    description: String,
    ingredients: String,
    directions: String,
    tags: [String],
    likedBy: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Post = mongoose.model('post', postSchema)
