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
      const userSaved = await new User(newUser).save()
      // Generate token
      const token = jwt.sign({ id: userSaved._id }, 'secret', {
        expiresIn: 86400
      })
      // Delete unnecessary params
      delete newUser.password
      // Add user id
      newUser.id = userSaved._id
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
        id: resUser._id,
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

  /**
   * @description Allows to get an user based on token
   * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
   * @param {string} token - Token received
   * @return {Object} - Returns the user if no errors. Throws error in other case
   * @memberof AuthService
   */
  async user(token) {
    try {
      // Extract user based on token provided
      const decoded = jwt.verify(token, 'secret')
      const userLogged = await User.findOne({ _id: decoded.id })
      // Token does not match with any user
      if (!userLogged) {
        throw new HttpError({
          status: 400,
          message: `Token received but any user has been found in our system.`
        })
      }
      // Create user logged instance
      const user = {
        id: userLogged._id,
        username: userLogged.username,
        email: userLogged.email,
        profilePicture: userLogged.profilePicture,
        bio: userLogged.bio,
        followers: userLogged.followers,
        following: userLogged.following,
        role: userLogged.role
      }
      // Send response
      return { user }
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}

export default AuthService
