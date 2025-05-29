import express from 'express'
import { applyJob, getUserapplication, getUserData, updateResume} from '../controller/UserController.js'
import upload from '../config/multer.js'

const router = express.Router()

// get the user data
router.get('/data',getUserData)

//apply for a job
router.post('/apply', applyJob)

//get applied jobs of user
router.get('/applications',getUserapplication)

// update the resume of the user
router.post('/update-resume', upload.single('resume'),updateResume)

export default router