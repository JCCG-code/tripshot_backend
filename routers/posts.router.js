import express from 'express'
const router = express.Router()

// API controllers
import * as postsController from '../controllers/posts.controller.js'

/**
 * --------------------------- ALL POSTS ---------------------------
 */

/**
 * @apiGroup Posts
 * @api {GET} /api/posts Get all posts
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/', postsController.getPosts)

/**
 * --------------------------- SINGLE POST ---------------------------
 */

/**
 * @apiGroup Posts
 * @api {POST} /api/posts Create a new post
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/', postsController.newPost)

/**
 * @apiGroup Posts
 * @api {GET} /api/posts/:postId Get a single post by id
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:postId', postsController.getOnePost)

/**
 * @apiGroup Posts
 * @api {PUT} /api/posts/:postId Update a single post by id
 * @apiDescription
 * Some description here
 * and here
 */
router.put('/:postId', postsController.updatePost)

/**
 * @apiGroup Posts
 * @api {DELETE} /api/posts/:postId Delete a single post by id
 * @apiDescription
 * Some description here
 * and here
 */
router.delete('/:postId', postsController.deletePost)

/**
 * --------------------------- POST COMMENTS ---------------------------
 */

/**
 * @apiGroup Posts
 * @api {GET} /api/posts/:postId/comments Get comments from a post
 * @apiDescription
 * Some description here
 * and here
 */
router.get('/:postId/comments', postsController.getComments)

/**
 * @apiGroup Posts
 * @api {POST} /api/posts/:postId/comments Add a comment into a post
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/:postId/comments', postsController.newComment)

/**
 * @apiGroup Posts
 * @api {PUT} /api/posts/:postId/comments/:commentId Update a single comment into a post
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/:postId/comments/:commentId', postsController.updateComment)

/**
 * @apiGroup Posts
 * @api {DELETE} /api/posts/:postId/comments/:commentId Delete a single comment into a post
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/:postId/comments/:commentId', postsController.deleteComment)

/**
 * --------------------------- POST LIKES ---------------------------
 */

/**
 * @apiGroup Posts
 * @api {POST} /api/posts/:postId/like Add a like into a post
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/:postId/like', postsController.addLike)

/**
 * @apiGroup Posts
 * @api {DELETE} /api/posts/:postId/like Delete a like into a post
 * @apiDescription
 * Some description here
 * and here
 */
router.delete('/:postId/like', postsController.deleteLike)

export default router
