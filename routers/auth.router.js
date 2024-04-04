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

export default router
