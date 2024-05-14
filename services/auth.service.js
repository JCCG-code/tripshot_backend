// Packages
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
// Models
import User from '../models/User.js'
// Errors
import HttpError from '../errors/HttpError.js'

/**
 *
 */
class AuthService {
  /**
   * @description Saves an user into database
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {Object} user - User received
   * @return {Object} - Returns the user saved if no errors. Throws error in other case
   * @memberof AuthService
   */
  async register(user) {
    try {
      // Request user to database
      const resUser = await User.findOne({
        username: user.username,
        email: user.email
      })
      if (resUser) {
        throw new HttpError({
          status: 400,
          message: `This username ${user.username} or this email ${user.email} already exists`
        })
      }
      // Save new user
      const newUser = await new User({
        username: user.username,
        email: user.email,
        password: await bcryptjs.hash(
          user.password,
          await bcryptjs.genSalt(10)
        ),
        role: user.role,
        posts: user.posts
      }).save()
      // Generate token
      const token = jwt.sign({ id: newUser._id }, 'secret', {
        expiresIn: 86400
      })
      // Delete unnecessary params
      delete newUser.password
      // Send response
      return { newUser, token }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

export default AuthService
