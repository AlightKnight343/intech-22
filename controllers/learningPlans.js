import LearningPlan from '../models/learningPlanSchema.js'

export const learning_plans_get = async (req, res) => {
    const learningPlans = await LearningPlan.find().sort({dateCreated:-1})
    res.render('learning_plans', {title: "Learning Plans", learningPlans})
}

export const learning_plan_get = async (req, res) => {
    const id = req.params.id
    const learningPlan = await LearningPlan.findOne({id:id})
    res.render('learning_plan', {title: "Learning Plan", learningPlan})
}