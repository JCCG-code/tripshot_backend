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
 * @return {Object} User updated
 */
export const updateUser = async (req, res) => {
  const { params } = req
  const { body } = req
  const { files } = req
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
  if (!body.username && !body.email && !files && !body.password && !body.bio) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Any user data provided to update'
      }
    })
    return
  }
  // Check file count
  if (files) {
    if (files.length > 1) {
      res.status(400).send({
        status: 'FAILED',
        data: {
          error: 'Only one file is allowed'
        }
      })
      return
    }
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
  // Check is password is empty
  if (body.password === '') {
    delete newUserData.password
  }
  // Check if profile picture is updated
  if (files.length > 0) {
    newUserData.profilePicture = files[0].filename
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

/**
 * @description Delete an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} User deleted
 */
export const deleteUser = async (req, res) => {
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
    const deleteUser = await usersService.deleteUser(userId)

    // All correct
    res.status(201).send({ status: 'OK', data: deleteUser })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Get all posts from an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Posts requested
 */
export const getUserPosts = async (req, res) => {
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
    const getUserPosts = await usersService.getUserPosts(userId)

    // All correct
    res.status(201).send({ status: 'OK', data: getUserPosts })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Get followers from an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Users requested
 */
export const getFollowers = async (req, res) => {
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
    const getFollowers = await usersService.getFollowers(userId)

    // All correct
    res.status(201).send({ status: 'OK', data: getFollowers })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Get followings from an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Users requested
 */
export const getFollowing = async (req, res) => {
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
    const getFollowing = await usersService.getFollowing(userId)

    // All correct
    res.status(201).send({ status: 'OK', data: getFollowing })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Follow an user
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Users requested
 */
export const newFollow = async (req, res) => {
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
  if (!body.id) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Any userId provided to follow'
      }
    })
    return
  }
  const userId = req.params.userId
  const userIdToFollow = body.id
  try {
    // Class service instance
    const usersService = new UsersService()
    const newFollow = await usersService.newFollow(userId, userIdToFollow)

    // All correct
    res.status(201).send({ status: 'OK', data: newFollow })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}
