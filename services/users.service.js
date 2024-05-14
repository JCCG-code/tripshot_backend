// Models
import User from '../models/User.js'
// Errors
import HttpError from '../errors/HttpError.js'

/**
 *
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
      // Request user to database
      const resUser = await User.findOne({ _id: userId })
      if (!resUser) {
        throw new HttpError({
          status: 400,
          message: 'This userId does not match any user in our system.'
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
   * @description Allows to get an user from database
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
      return { updatedUser }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

export default usersService
