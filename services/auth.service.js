import User from '../models/User.js'

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
    // Save user received into database
    // const newUser = await new User(user)
    return user
  }
}

export default AuthService
