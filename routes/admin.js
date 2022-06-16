import express from 'express'
import {nanoid} from 'nanoid'
const router = express.Router()
import {admin, assignments, assignment_upload, students, view_submissions,view_submission, notice, notice_post, create_learning_plan_get, create_learning_plan_post, manage_learning_plans_get, manage_learning_plan_get, manage_learning_plan_post} from '../controllers/admin.js'
import {ensureAuthenticated, ensureAdminAuthenticated} from '../middlewares/authenticate.js'
import Assignment from '../models/assignmentSchema.js'

router.get('/', ensureAdminAuthenticated, admin)
router.get('/assignments', ensureAdminAuthenticated, assignments)
router.get('/assignments/upload', ensureAdminAuthenticated, assignment_upload)
router.get('/students', ensureAdminAuthenticated, students)
router.get('/assignments/submissions', ensureAdminAuthenticated, view_submissions)
router.get('/assignments/submissions/:id', ensureAdminAuthenticated, view_submission)
router.get('/notice', ensureAdminAuthenticated, notice)
router.post('/notice', ensureAdminAuthenticated, notice_post)
//learning plans
router.get('/createlearningplan', ensureAdminAuthenticated, create_learning_plan_get)
router.post('/createlearningplan', ensureAdminAuthenticated, create_learning_plan_post)
router.get('/managelearningplans', ensureAdminAuthenticated, manage_learning_plans_get)
router.get('/managelearningplan/:id', ensureAdminAuthenticated, manage_learning_plan_get)
router.post('/managelearningplan/:id', ensureAdminAuthenticated, manage_learning_plan_post)

router.post('/assignments/upload', async (req, res, next) => {

    const assignment = new Assignment({
        id: nanoid(),
        file: req.body.file,
        teacher: "test",
        dueDate: req.body.date,
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject    
    })
    res.send(`Assignment created on ${process.env.APP_BASE_URL}/assignments/${assignment.id}`)
    await assignment.save()
})
export {router};