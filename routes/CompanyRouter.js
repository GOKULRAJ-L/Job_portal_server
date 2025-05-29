import express from 'express'
import { changeJobApplicationStatus, changeJobVisibility, companyLogin, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, postJob, registerCompany } from '../controller/CompanyController.js';
import upload from '../config/multer.js';
import { authCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

//register a company
router.post('/register' ,upload.single('image'), registerCompany)
//login a company
router.post('/login',companyLogin)
//Get company Data
router.get('/company', authCompany, getCompanyData)
//post a Job
router.post('/post-job', authCompany, postJob)
//Get applications data of a company
router.get('/applicants', authCompany, getCompanyJobApplicants)
//Get Company posted Jobs
router.get('/list-jobs', authCompany, getCompanyPostedJobs)
//Change Application status
router.post('/change-status', authCompany, changeJobApplicationStatus)
//change Job visibility 
router.post('/change-visibility', authCompany, changeJobVisibility)


export default router
