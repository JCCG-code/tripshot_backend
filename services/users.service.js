// Models
import User from '../models/User.js'
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
   * @memberof AuthService
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
   * @memberof AuthService
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
   * @memberof AuthService
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
}

export default usersService
