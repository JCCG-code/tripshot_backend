// Models
import User from '../models/User.js'
import Post from '../models/Post.js'
// Errors
import HttpError from '../errors/HttpError.js'
import mongoose from 'mongoose'

/**
 * Class for managing usersService
 */
class usersService {
  /**
   * @description Allows to get an user from database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User received
   * @return {Object} - Returns the user saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async getUser(userId) {
    try {
      let resUser = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userId)) {
        resUser = await User.findOne({ _id: userId })
      } else {
        resUser = await User.findOne({ username: userId })
      }
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This profile does not match with any profile in our system.'
        })
      }
      // Send response
      return { resUser }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to update an user
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User id received
   * @param {Object} newUserData - The updated user
   * @return {Object} - Returns the user saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async updateUser(userId, newUserData) {
    try {
      // Request user to database
      const resUser = await User.findOne({ _id: userId })
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This userId does not match any user in our system.'
        })
      }
      // Save user and update
      await User.findByIdAndUpdate(userId, newUserData)
      const updatedUser = await User.findOne({ _id: userId })
      // Create object to send
      const userData = {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        bio: updatedUser.bio,
        followers: updatedUser.followers,
        following: updatedUser.following,
        role: updatedUser.role
      }
      // Return updated user
      return { userData }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get an user from database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User received
   * @return {Object} - Returns the user saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async deleteUser(userId) {
    try {
      // Request user to database
      const resUser = await User.findOne({ _id: userId })
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This userId does not match any user in our system.'
        })
      }
      // Delete user
      const deletedUser = await User.findByIdAndDelete(resUser._id)
      // Create object to send
      const userData = {
        username: deletedUser.username,
        email: deletedUser.email
      }
      // Send response
      return { userData }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get posts of an user from database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User received
   * @return {Object} - Returns the user posts saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async getUserPosts(userId) {
    try {
      let resUser = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userId)) {
        resUser = await User.findOne({ _id: userId })
      } else {
        resUser = await User.findOne({ username: userId })
      }
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This profile does not match with any profile in our system.'
        })
      }
      // Request all posts from and user
      const resUserPosts = await Post.find({ user: resUser._id })
      // Send response
      return { resUserPosts }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get followers from an user
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User received
   * @return {Object} - Returns the followers saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async getFollowers(userId) {
    try {
      let resUser = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userId)) {
        resUser = await User.findOne({ _id: userId })
      } else {
        resUser = await User.findOne({ username: userId })
      }
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This profile does not match with any profile in our system.'
        })
      }
      // Request all followers of and user
      return getUserByIds(resUser.followers)
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to get followers from an user
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User received
   * @return {Object} - Returns the followers saved if no errors. Throws error in other case
   * @memberof usersService
   */
  async getFollowing(userId) {
    try {
      let resUser = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userId)) {
        resUser = await User.findOne({ _id: userId })
      } else {
        resUser = await User.findOne({ username: userId })
      }
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This profile does not match with any profile in our system.'
        })
      }
      // Request all followers of and user
      return getUserByIds(resUser.following)
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }

  /**
   * @description Allows to update an user
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {String} userId - User id received
   * @param {Object} userIdToFollow - The user to follow
   * @return {Object} - Returns the user object if no errors. Throws error in other case
   * @memberof usersService
   */
  async newFollow(userId, userIdToFollow) {
    try {
      let resUser = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userId)) {
        resUser = await User.findOne({ _id: userId })
      } else {
        resUser = await User.findOne({ username: userId })
      }
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This profile does not match with any profile in our system.'
        })
      }
      let resUserToFollow = null
      // Request user to database
      if (mongoose.Types.ObjectId.isValid(userIdToFollow)) {
        resUserToFollow = await User.findOne({ _id: userIdToFollow })
      } else {
        resUserToFollow = await User.findOne({ username: userIdToFollow })
      }
      if (!resUserToFollow) {
        throw new HttpError({
          status: 400,
          message:
            'This profile to follow does not match with any profile in our system.'
        })
      }
      // Check if user already follows the requested user
      if (resUser.following.includes(resUserToFollow._id)) {
        throw new HttpError({
          status: 400,
          message: 'Already following this user.'
        })
      }
      // Add userIdToFollow to following current user array
      // Add userId to followers current userIdToFollow array
      resUserToFollow.followers.push(resUser._id)
      resUser.following.push(resUserToFollow._id)
      await resUser.save()
      await resUserToFollow.save()
      // Return updated user
      return 'User followed successfully'
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

/**
 * @description Allows to get an array of user object based on ids
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {mongoose.Types.ObjectId[]} arrayId - an array of ids
 * @return {object[]} Array of {username, email, profilePicture} of users
 */
async function getUserByIds(arrayId) {
  // Initializations
  const res = []
  let userInfo = {}
  let resUser = {}
  // Check all received ids
  for (const userId of arrayId) {
    resUser = await User.findOne({ _id: userId })
    // Mount userInfo object
    userInfo = {
      username: resUser.username,
      email: resUser.email,
      profilePicture: resUser.profilePicture
    }
    // Add userInfo object to array res
    res.push(userInfo)
  }
  // Return array res
  return res
}

export default usersService
