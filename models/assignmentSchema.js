import mongoose from 'mongoose';
const reqString = { type:String, required:true }
const reqBoolean = {type: Boolean, required:true, default:false}
import moment from 'moment'
let now = new Date()
const dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');


const assignmentSchema = new mongoose.Schema({
    id: reqString,
    file: String,
    teacher: reqString,
    dateAssigned: {type:String, default: dateStringWithTime}, 
    dueDate: reqString,
    title: reqString,
    description: reqString,
    subject: reqString,
    submittedBy: Array,
})

export default mongoose.model("Assignment", assignmentSchema)
