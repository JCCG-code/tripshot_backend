// Packages
import jwt from 'jsonwebtoken'
// Models
import User from '../models/User.js'

/**
 * @description Get user in session through bearer token
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next object
 * @return {Object} User requested
 */
export const verifyToken = async (req, res, next) => {
  try {
    // We extract the bearer header
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader)
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' })
    else {
      // We extract the token
      const bearerHeaderSplit = bearerHeader.split(' ', 2)
      const token = bearerHeaderSplit[1]
      // Decoding token
      const decoded = jwt.verify(token, 'secret')
      // Detects if user in session is correct
      const userInSession = await User.findOne({ _id: decoded.id })
      if (!userInSession)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
      else {
        next()
      }
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
