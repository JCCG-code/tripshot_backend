// Local files
import AuthService from '../services/auth.service.js'

/**
 * @description User controller authentication
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} adawd
 */
export const register = async (req, res) => {
  const { body } = req
  // Check body parameters
  if (
    !body.username ||
    !body.email ||
    !body.password ||
    !body.passwordConfirm
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing in request body: 'username', 'email', 'password' or 'passwordConfirm'"
      }
    })
    return
  }
  // Check matching password
  if (body.password !== body.passwordConfirm) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Passwords do not match'
      }
    })
    return
  }
  // New user to create
  const newUser = {
    username: body.username,
    email: body.email,
    password: body.password,
    role: ['client'],
    posts: null
  }
  try {
    // Class service instance
    const authService = new AuthService()
    const register = await authService.register(newUser)

    // All correct
    res.status(201).send({ status: 'OK', data: register })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}
