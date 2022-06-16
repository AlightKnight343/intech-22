import User from '../models/userSchema.js'
import Assignment from '../models/assignmentSchema.js'
import Notice from '../models/noticeSchema.js'
import LearningPlan from '../models/learningPlanSchema.js'

import {nanoid} from 'nanoid'

export const admin = async (req, res)=>{
    res.render("admin/admin", {title: "admin", user:req.user})
}

export const assignments = async (req, res)=>{
    res.render("admin/assignments", {title: "admin"})
}

export const assignment_upload = async (req, res)=>{
    res.render('admin/assignment_upload', {title: "Upload Assignment"})
}

export const students = async (req, res)=>{
    const users = await User.find()
    res.render("admin/students", {title: "admin", users})
}

export const view_submissions = async(req, res)=>{
    const assignments = await Assignment.find().sort({dateAssigned:-1})
    res.render('admin/submissions', {title: "Submissions", assignments:assignments})
}

export const view_submission = async(req, res)=>{
    const id = req.params.id
    const assignment = await Assignment.find({id:id})
    if(assignment){
        let submissions = assignment[0].submittedBy
        console.log(submissions)
        res.render('admin/submission', {title: "Submissions", submissions:submissions, id:id})    
    }else{
        res.send("No assignment found")
    }
}

export const notice = async (req, res) => {
    res.render('admin/notice', {title: "Notice"})
}   

export const notice_post = async (req, res) => {
    try {
        const newNotice = new Notice({
            id:nanoid(),
            title: req.body.title,
            description: req.body.description
        })
        await newNotice.save().then(res.redirect('/notices'))
    } catch (error) {
        console.log(error)
        res.send("Something went wrong!")
    }
}

export const create_learning_plan_get = async (req, res)=>{
    res.render('admin/create_learning_plan', {title: "Learning Plans"})
}

export const create_learning_plan_post = async (req, res)=>{
    try {
        const newLearningPlan = new LearningPlan({
            id:nanoid(),
            title: req.body.title,
            description: req.body.description
        })
        await newLearningPlan.save().then(res.redirect('/admin/managelearningplans'))
    } catch (error) {
        console.log(error)
        res.send("Something went wrong!")
    }
}

export const manage_learning_plans_get = async (req, res)=>{
    const learningPlans = await LearningPlan.find().sort({dateCreated:-1})
    res.render('admin/manage_learning_plans', {title: "Learning Plans", learningPlans})
}


export const manage_learning_plan_get = async (req, res)=>{
    const id = req.params.id
    const learningPlan = await LearningPlan.findOne({id:id}, (err, docs)=> {if(err) res.send("Something went wrong please retry")}).clone()
    res.render('admin/manage_learning_plan', {title: "Learning Plans", learningPlan})
}

export const manage_learning_plan_post = async (req, res)=>{
    const id = req.params.id
    const content = {
        title: req.body.title,
        description: req.body.description,
        resources: req.body.resources
    }
    await LearningPlan.findOneAndUpdate({id:id},
        {$push: {lessons: content}},
        (err, docs)=>{
            if(err) console.log(err)
        }
        ).clone().then(res.redirect(`/admin/managelearningplan/${id}`))
}