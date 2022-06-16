import express from 'express'
const router = express.Router()
import {assignments, assignment, assignment_submit, assignment_search} from '../controllers/assignments.js'
import {ensureAuthenticated} from '../middlewares/authenticate.js'

router.get('/', ensureAuthenticated, assignments)
router.get('/:id', ensureAuthenticated, assignment)
router.post('/:id/submit', ensureAuthenticated, assignment_submit)
router.post('/search', ensureAuthenticated, assignment_search)

export {router};