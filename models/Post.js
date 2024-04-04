// General imports
import { Schema, model } from 'mongoose'

// Schema creation
const postSchema = new Schema(
  {
    link: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    place: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },

    // Comments of the post
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
