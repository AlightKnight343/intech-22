import mongoose from 'mongoose';
const reqString = { type:String, required:true }
import moment from 'moment'
let now = new Date()
const dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');


const learningPlanSchema = new mongoose.Schema({
    id: reqString,
    dateAssigned: {type:String, default: dateStringWithTime}, 
    title: reqString,
    description: reqString,
    lessons: Array,
    })

export default mongoose.model("LearningPlan", learningPlanSchema)
