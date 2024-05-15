// Packages
import express from 'express'
// Local files
import * as usersController from '../controllers/users.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

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
router.get('/:userId', verifyToken, usersController.getUser)

/**
 * @apiGroup Users
 * @api {PUT} /api/users/:userId Update info from an user
 * @apiDescription
 * Some description here
 * and here
 */
router.put('/:userId', verifyToken, usersController.updateUser)

/**
 * @apiGroup Users
 * @api {DELETE} /api/users/:userId Delete an user
 * @apiDescription
 * Some description here
 * and here
 */
router.delete('/:userId', verifyToken, usersController.deleteUser)

// /**
//  * @apiGroup Users
//  * @api {GET} /api/users/:userId/posts Get all posts from an user
//  * @apiDescription
//  * Some description here
//  * and here
//  */
// router.get('/:userId/posts', verifyToken, usersController.getUserPosts)

// /**
//  * --------------------------- USER FOLLOWS ---------------------------
//  */

// /**
//  * @apiGroup Users
//  * @api {GET} /api/users/:userId/followers Get followers from an user
//  * @apiDescription
//  * Some description here
//  * and here
//  */
// router.get('/:userId/followers', verifyToken, usersController.getFollowers)

// /**
//  * @apiGroup Users
//  * @api {GET} /api/users/:userId/followers Get following from an user
//  * @apiDescription
//  * Some description here
//  * and here
//  */
// router.get('/:userId/following', verifyToken, usersController.getFollowing)

// /**
//  * @apiGroup Users
//  * @api {POST} /api/users/:userId/follow Follow an user
//  * @apiDescription
//  * Some description here
//  * and here
//  */
// router.post('/:userId/follow', verifyToken, usersController.newFollow)

// /**
//  * @apiGroup Users
//  * @api {DELETE} /api/users/:userId/follow Leave to follow an user
//  * @apiDescription
//  * Some description here
//  * and here
//  */
// router.delete('/:userId/follow', verifyToken, usersController.leaveFollow)

export default router
