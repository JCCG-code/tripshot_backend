import { Schema, model } from 'mongoose'

// Schema creation
const userSchema = new Schema(
  {
    // Basic data client
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    // Client or superadmin role
    role: [
      {
        type: String
      }
    ],

    // Posts of client
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Export user schema
export default model('User', userSchema)
