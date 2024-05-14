// Packages
import express from 'express'
// Local files
import * as usersController from '../controllers/users.controller.js'

const router = express.Router()

/**
 * --------------------------- USER MANAGEMENT ---------------------------
 */

/**
 * @apiGroup Users
 * @api {GET} /api/users/:userId Get info from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:userId', usersController.getUser)

/**
 * @apiGroup Users
 * @api {PUT} /api/users/:userId Update info from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.put('/:userId', usersController.updateUser)

/**
 * @apiGroup Users
 * @api {DELETE} /api/users/:userId Delete an user
 * @apiDescription
 * Some description here
 * and here
 */
router.delete('/:userId', usersController.updateUser)

/**
 * @apiGroup Users
 * @api {GET} /api/users/:userId/posts Get all posts from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:userId/posts', usersController.getUserPosts)

/**
 * --------------------------- USER FOLLOWS ---------------------------
 */

/**
 * @apiGroup Users
 * @api {GET} /api/users/:userId/followers Get followers from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:userId/followers', usersController.getFollowers)

/**
 * @apiGroup Users
 * @api {GET} /api/users/:userId/followers Get following from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:userId/following', usersController.getFollowing)

/**
 * @apiGroup Users
 * @api {POST} /api/users/:userId/follow Follow an user
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/:userId/follow', usersController.newFollow)

/**
 * @apiGroup Users
 * @api {DELETE} /api/users/:userId/follow Leave to follow an user
 * @apiDescription
 * Some description here
 * and here
 */
router.delete('/:userId/follow', usersController.leaveFollow)

export default router
