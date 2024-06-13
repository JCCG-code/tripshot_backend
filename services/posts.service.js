// Models
import User from '../models/User.js'
import Post from '../models/Post.js'
// Errors
import HttpError from '../errors/HttpError.js'

/**
 *
 */
class PostsService {
  /**
   * @description Allows to get all saved posts
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @return {Object} - Returns all saved posts. Throws error in other case
   * @memberof PostsService
   */
  async getPosts() {
    try {
      // Request all posts to database
      const resPosts = await Post.find({})
      // Send response
      return { resPosts }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to create a post
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {Object} post - Post received
   * @return {Object} - Returns the post saved if no errors. Throws error in other case
   * @memberof AuthService
   */
  async newPost(post) {
    try {
      // Request user to database
      const resUser = await User.findOne({ _id: post.user })
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This userId does not match any user in our system.'
        })
      }
      // Save new post
      const newPost = await new Post(post).save()
      // Send response
      return { newPost }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get one post by id
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} postId - Post received
   * @return {Object} - Returns the requested post. Throws error in other case
   * @memberof PostsService
   */
  async getOnePost(postId) {
    try {
      // Request post to database
      const resPost = await Post.findOne({ _id: postId })
      if (!resPost) {
        throw new HttpError({
          status: 400,
          message: 'This postId does not match any post in our system.'
        })
      }
      // Send response
      return { resPost }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to update a post
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} postId - Post id received
   * @param {Object} newPostData - The updated Post
   * @return {Object} - Returns the post saved if no errors. Throws error in other case
   * @memberof AuthService
   */
  async updatePost(postId, newPostData) {
    try {
      // Request Post to database
      const resPost = await Post.findOne({ _id: postId })
      if (!resPost) {
        throw new HttpError({
          status: 400,
          message: 'This postId does not match any post in our system.'
        })
      }
      // Save post and update
      await Post.findByIdAndUpdate(postId, newPostData)
      const updatedPost = await Post.findOne({ _id: postId })
      // Return updated Post
      return { updatedPost }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get an post from database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} postId - Post received
   * @return {Object} - Returns the Post saved if no errors. Throws error in other case
   * @memberof AuthService
   */
  async deletePost(postId) {
    try {
      // Request Post to database
      const resPost = await Post.findOne({ _id: postId })
      if (!resPost) {
        throw new HttpError({
          status: 400,
          message: 'This postId does not match any post in our system.'
        })
      }
      // Delete Post
      const deletedPost = await Post.findByIdAndDelete(resPost._id)
      // Create object to send
      const postData = {
        Postname: deletedPost.postname,
        email: deletedPost.email
      }
      // Send response
      return { postData }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

export default PostsService
