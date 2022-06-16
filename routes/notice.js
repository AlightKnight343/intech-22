import express from 'express'
const router = express.Router()
import {notice, notice_find} from '../controllers/notice.js'

router.get('/', notice)
router.get('/:id', notice_find)

export {router};