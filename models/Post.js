// General imports
import { Schema, model } from 'mongoose'

// Schema creation
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },

    // Likes collection
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    // Comments collection
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// Export user schema
export default model('Post', postSchema)
