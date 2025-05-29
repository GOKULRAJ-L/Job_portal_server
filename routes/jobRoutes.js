import express from 'express'
import { getalljobs, getjobsById } from '../controller/jobController.js'

const router = express.Router()

// get all jobs

router.get('/jobs',getalljobs)

//get jobs by id

router.get('/:id',getjobsById)


export default router