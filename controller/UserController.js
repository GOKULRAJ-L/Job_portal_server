import JobApplication from "../models/JobapplicationSchema.js"
import Job from "../models/JobSchema.js"
import User from "../models/UserSchema.js"
import {v2 as cloudinary} from 'cloudinary'


//get user data
export const getUserData = async(req,res)=>{
    const userId = req.auth.userId

    try{

        const user = await User.findById(userId)

        if(!user){
            return res.json({
                success:false,
                message:"User is not available"
            })
        }

        res.json({
            success:true,
            user
        })
    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}

//apply for a job
export const applyJob = async (req,res)=>{

    const{jobId} = req.body

    const userId = req.auth.userId

    try{
        const alreadyapplied  = await JobApplication.find({userId,jobId})

        if(alreadyapplied){
            return res.json({
                success:false,
                message:"Already applied for the job"
            })
        }

        const job = await Job.findById(jobId)

        if(!job){
            return res.json({
                success:false,
                message:"Job not exists"
            })
        }

        await JobApplication.create({
            companyId:job.companyId,
            userId,
            jobId,
            date:Date.now()
        })

        res.josn({
            success:true,
            message:"Job applied successfully"
        })

    }catch(err){

        res.json({
            success:false,
            error:err.message
        })
    }
}

//get user applications
export const getUserapplication = async (req,res)=>{
    try{
        const userId = req.auth.userId

        const applications = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec() // return true native promise .exec()

        if(!applications){
            return res.json({
                success:false,
                message:"No job applications found"
            })
        }

        res.json({
            success:true,
            applications
        })
    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}

//update user profile we can update only the resume
// reamining we can only update using clerk

export const updateResume = async (req,res)=>{

    const userId = req.auth.userId;

    const resume = req.file

    try{

        const user = await User.findById(userId)

        const resumeupload = await cloudinary.uploader.upload(resume.path)

        user.resume = resumeupload.secure_url

        await user.save()

        res.json({
            success:true,
            message:'Resume Updated successfully'
        })

    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}


