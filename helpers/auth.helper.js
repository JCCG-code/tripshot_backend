import User from '../models/User.js'
import HttpError from '../errors/HttpError.js'

/**
 *
 */
export class HelperAuthClass {
  /**
   * @description Check if the new user can be saved into database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {Object} newUser - the new user
   * @return {Boolean} - true if new user can be saved or false
   * @memberof HelperAuthClass
   */
  static async checkRegistration(newUser) {
    try {
      // Request user to database
      const resUser = await User.find({
        username: newUser.username,
        email: newUser.email
      })
      if (resUser) {
        throw new HttpError({
          status: 400,
          message: `This username ${newUser.username} or this email ${newUser.email} already exists`
        })
      }
      return true
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}
