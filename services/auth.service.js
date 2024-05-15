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
   * @description Allows to register an user
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
      const newUser = {
        username: user.username,
        email: user.email,
        password: await bcryptjs.hash(
          user.password,
          await bcryptjs.genSalt(10)
        ),
        profilePicture: '',
        bio: '',
        followers: null,
        following: null,
        role: ['client']
      }
      await new User(newUser).save()
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

  /**
   * @description Allows to login an user
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {Object} user - User received
   * @return {Object} - Returns the user saved if no errors. Throws error in other case
   * @memberof AuthService
   */
  async login(user) {
    try {
      // Request user to database
      const resUser = await User.findOne({
        email: user.email
      })
      // User not registered or incorrect password
      console.log(user.password, resUser.password)
      if (
        !resUser ||
        !(await bcryptjs.compare(user.password, resUser.password))
      ) {
        throw new HttpError({
          status: 400,
          message: `The credentials do not match any account in our system.`
        })
      }
      // Generate token
      const token = jwt.sign({ id: resUser._id }, 'secret', {
        expiresIn: 86400
      })
      // Create user logged instance
      const userLogged = {
        username: resUser.username,
        email: resUser.email,
        profilePicture: resUser.profilePicture,
        bio: resUser.bio,
        followers: resUser.followers,
        following: resUser.following,
        role: resUser.role
      }
      // Send response
      return { userLogged, token }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

export default AuthService
