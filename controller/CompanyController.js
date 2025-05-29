import Company from "../models/companySchema.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generatToken from "../utils/generateToken.js";
import Job from "../models/JobSchema.js";
//Register as a new Company 
export const registerCompany = async (req,res)=>{
    const{name ,email , password} = req.body;

    const image = req.file

    if(!name || !email || !password || !image){
        return res.json({
            success:false,
            message:'Missing Details'
        })
    }

    try{
        const companyExists = await Company.findOne({email});
       
        if(companyExists){
            return res.json({
                success:false,
                message: 'Already the Company Exists'
            })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt)

        const imageUpload =  await cloudinary.uploader.upload(image.path)

        const company = await Company.create({
            name,
            email,
            password : hashedPassword,
            image : imageUpload.secure_url
        })

        res.json({
            success:true,
            company:{
                _id : company._id,
                name: company.name,
                email:company.email,
                image:company.image
            },
            token : generatToken(company._id)
        })

    }catch(err){
        res.json({
            succes:false,
            error:err.message
        })
    }
}



// Login for the company
export const companyLogin = async (req,res)=>{
    const{email,password} = req.body;

    try{

        if(!email || !password){
            return res.json({
                success:false,
                message:'Missing Details'
            })
        }

        const company = await Company.findOne({email})
        if(company && bcrypt.compare(password,company.password)){
            
            res.json({
                success:true,
                company:{
                _id : company._id,
                name: company.name,
                email:company.email,
                image:company.image
            },
            token:generatToken(company._id)
            })
        }
        else{
            res.json({
                success:false,
                error:"Invalid email or Password"
            })
        }

    }catch(err){
        res.json({
            success:false,
            error: err.message
        })
    }
}


// Get Company Data 
export const getCompanyData = async (req,res)=>{

    try{
        const company = req.company;
    res.json({
        success:true,
        company
    })
    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}


//Post a new Job
export const postJob = async (req,res)=>{
    const{title,description,location,category,level,salary}  = req.body
    
    const companyId = req.company._id

    try{
        const newjob = await Job.create({
            title,
            description,
            location,
            category,
            level,
            salary,
            date:Date.now(),
            companyId
        })

        res.json({
            success:true,
            newJob:newjob
        })

    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}


//get company Job applications
export const getCompanyJobApplicants = async (req,res)=>{
    
}



//get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res)=>{
    try{
        const companyId = req.company._id
        const jobs =  await Job.find({companyId})
        res.json({
            success:true,
            jobs
        })
        
    }catch(err){
        res.json({
            success:false,
            error: err.message
        })
    }
}



//change Job application status
export const changeJobApplicationStatus = async (req,res)=>{

}



//change job Visibility
export const changeJobVisibility = async (req,res)=>{
    try{
        const {id} = req.body
        const companyId = req.company._id

        const job = await Job.findById(id)

        if(companyId.toString()===job.companyId.toString()){
            job.visible = !job.visible
        }
        await job.save()

        res.json({
            success:true,
            job
        })
    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}