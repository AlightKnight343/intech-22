import Notice from '../models/noticeSchema.js'

export const notice = async (req, res)=>{
    const notices = await Notice.find().sort({dateAssigned:-1})
    res.render("notices", {title: "Notices", notices:notices})
}

export const notice_find = async (req, res)=>{
    const id = req.params.id
    const notice = await Notice.findOne({id:id})
    if(notice) res.render("notice", {title: "Notices", notice:notice})
    else res.send(`Notice not found go back to ${process.env.APP_BASE_URL}/notices`)
}