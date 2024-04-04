// General imports
import { Schema, model } from 'mongoose'

// Schema creation
const commentSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

// Export user schema
export default model('Comment', commentSchema)
