import Assignment from '../models/assignmentSchema.js'
import User from '../models/userSchema.js'
import moment from 'moment'
let now = new Date()
let dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

export const assignments = async (req, res)=>{
    const assignments = await Assignment.find().sort({dateAssigned:-1})
    res.render("assignments", {title: "Assignments", assignments})
}

export const assignment = async (req, res)=>{
    const id = req.params.id
    Assignment.findOne({id:id}, (err, data)=>{
        if(err) res.send("Assignment Not Found")
        else{
            if(data == null) res.send("Assignment Not Found")
            else res.render('assignment', {title:"Assignment", data:data})
        }
    })
    
}

export const assignment_submit = async (req, res)=>{
    const id = req.params.id
    let submission = {
        studentId: req.user.userId,
        studentName: req.user.username,
        file:req.body.file,
        date:dateStringWithTime
    }
    let assignment = await Assignment.findOne({id:id}).clone()
    let studentSubmit = {
        file:req.body.file,
        assignment: assignment.id,
        date: dateStringWithTime
    }

    await Assignment.findOne({id:id}, 
        async (err, data)=>{
        if(err) res.send("Something went wrong, please try again")
        else{
            let array = data.submittedBy
            let found = array.find((element)=>{
                return element.studentId == req.user.userId
            })
            if(found){
                res.json({"message": "Assignment already submitted once!"})
            }else{  
                let assignmentSubmission = await Assignment.findOneAndUpdate({id:id}, 
                    {$push: {submittedBy: submission}},
                    (err, docs)=>{
                        if(err) res.send("Something Went Wrong...")
                    }
                    ).clone()
                let studentSubmission = await User.findOneAndUpdate({userId:req.user.userId}, 
                    {$push: {assignmentSubmitted: studentSubmit}},
                    (err, docs)=>{
                        if(err) res.json({"message":"Something Went Wrong..."})
                    }
                    ).clone()
                await assignmentSubmission.save()
                await studentSubmission.save().then(res.json({"message": "Successfully submitted assignment!"}))
            }
        }
    }).clone()

}


export const assignment_search = async (req, res) =>{
    if(req.body.payload){
        let payload = req.body.payload.trim()
        let search = await Assignment.find({title: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec()
        res.send({results: search})
    }else{
        res.send({results: ''})
    }
    
}