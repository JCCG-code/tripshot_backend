// Local files
import PostsService from '../services/posts.service.js'

/**
 * @description Allows to get all posts
 * @param {object} _req - Request object
 * @param {object} res - Response object
 * @return {json} adawd
 */
export const getPosts = async (_req, res) => {
  try {
    // Class service instance
    const postsService = new PostsService()
    const getPosts = await postsService.getPosts()

    // All correct
    res.status(200).send({ status: 'OK', data: getPosts })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Allows to create a new post
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} adawd
 */
export const newPost = async (req, res) => {
  const { body } = req
  const { files } = req
  // Check body parameters
  if (
    !body.userId ||
    !body.description ||
    files.length === 0 ||
    !body.place ||
    !body.country
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing in request body: 'userId', 'description', 'place' or 'country'"
      }
    })
    return
  }
  // Check file count
  if (files.length > 4) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Only a maximum of 4 files are allowed'
      }
    })
    return
  }
  const postToSave = {
    user: body.userId,
    description: body.description,
    imageUrl: files.map((file) => file.filename),
    place: body.place,
    country: body.country,
    likes: [],
    comments: []
  }
  try {
    // Class service instance
    const postsService = new PostsService()
    const newPost = await postsService.newPost(postToSave)

    // All correct
    res.status(200).send({ status: 'OK', data: newPost })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Allows to get one post
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} adawd
 */
export const getOnePost = async (req, res) => {
  const { params } = req
  // Check request params parameters
  if (!params.postId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Post id not provided'
      }
    })
    return
  }
  const postId = req.params.postId
  try {
    // Class service instance
    const postsService = new PostsService()
    const getOnePost = await postsService.getOnePost(postId)

    // All correct
    res.status(200).send({ status: 'OK', data: getOnePost })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Update data of a post
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Post updated
 */
export const updatePost = async (req, res) => {
  const { params } = req
  const { body } = req
  const { files } = req
  // Check request params parameters
  if (!params.postId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Post id not provided'
      }
    })
    return
  }
  // Check body parameters
  if (!body.description && files.length === 0 && !body.place && !body.country) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Any post data provided to update'
      }
    })
    return
  }
  // Check file count
  if (files.length > 4) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Only a maximum of 4 files are allowed'
      }
    })
    return
  }
  // We save sanitized data
  const postId = req.params.postId
  const newPostData = {
    user: body.postId,
    description: body.description,
    imageUrl: files.map((file) => file.filename),
    place: body.place,
    country: body.country
  }
  try {
    // Class service instance
    const postsService = new PostsService()
    const updatePost = await postsService.updatePost(postId, newPostData)

    // All correct
    res.status(201).send({ status: 'OK', data: updatePost })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}

/**
 * @description Delete an Post
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {Object} Post deleted
 */
export const deletePost = async (req, res) => {
  const { params } = req
  // Check request params parameters
  if (!params.postId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error: 'Post id not provided'
      }
    })
    return
  }
  const postId = req.params.postId
  try {
    // Class service instance
    const postsService = new PostsService()
    const deletePost = await postsService.deletePost(postId)

    // All correct
    res.status(201).send({ status: 'OK', data: deletePost })
  } catch (err) {
    res
      .status(err?.status || 500)
      .send({ status: 'FAILED', data: { error: err?.message || err } })
  }
}
