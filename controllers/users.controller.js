// Packages
import bcryptjs from 'bcryptjs'
// Local files
import UsersService from '../services/users.service.js'

/**
 * @description Get data of an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} User requested
 */
export const getUser = async (req, res) => {
  const { params } = req
  // Check request params parameters
  if (!params.userId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'User id not provided'
      }
    })
    return
  }
  const userId = req.params.userId
  try {
    // Class service instance
    const usersService = new UsersService()
    const getUser = await usersService.getUser(userId)

    // All correct
    res.status(201).send({ status: 'OK', data: getUser })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Update data of an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} User requested
 */
export const updateUser = async (req, res) => {
  const { params } = req
  const { body } = req
  // Check request params parameters
  if (!params.userId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'User id not provided'
      }
    })
    return
  }
  // Check body parameters
  if (
    !body.username &&
    !body.email &&
    !body.password &&
    !body.profilePicture &&
    !body.bio
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Any user data provided to update'
      }
    })
    return
  }
  // We save sanitized data
  const userId = req.params.userId
  const newUserData = body
  // We have to check if any password has been received
  if (body.password) {
    newUserData.password = await bcryptjs.hash(
      body.password,
      await bcryptjs.genSalt(10)
    )
  }
  try {
    // Class service instance
    const usersService = new UsersService()
    const updateUser = await usersService.updateUser(userId, newUserData)

    // All correct
    res.status(201).send({ status: 'OK', data: updateUser })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}
