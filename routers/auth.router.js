import express from 'express'
const router = express.Router()

// API controllers
import * as authController from '../controllers/auth.controller.js'

/**
 * @apiGroup Auth
 * @api {POST} /api/auth/register User registration
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/register', authController.register)

/**
 * @apiGroup Auth
 * @api {POST} /api/auth/login User login
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/login', authController.login)

/**
 * @apiGroup Auth
 * @api {POST} /api/auth/user Get user based on token
 * @apiDescription
 * Some description here
 * and here
 */
router.post('/user', authController.user)

export default router
