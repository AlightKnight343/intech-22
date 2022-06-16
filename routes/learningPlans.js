import express from 'express'
const router = express.Router()
import {learning_plan_get, learning_plans_get} from '../controllers/learningPlans.js'
import {ensureAuthenticated} from '../middlewares/authenticate.js'

router.get('/', ensureAuthenticated, learning_plans_get)
router.get('/:id', ensureAuthenticated, learning_plan_get)

export {router};