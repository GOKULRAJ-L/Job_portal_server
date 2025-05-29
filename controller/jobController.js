import Job from "../models/JobSchema.js"


export const getalljobs  =  async (req,res)=>{

    try{

        const jobs = await Job.find({visible:true}).populate({path:'companyId', select:'-password'})

        res.json({
            success:true,
            jobs:jobs
        })


    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}

export const getjobsById =  async (req,res)=>{
    const {id} = req.params

    try{
        const job = await Job.findById(id).populate(
            {
                path:'companyId',
                select :'-password'
            }

        )
        if(!job){
            res.json({
                success:false,
                message:'Job not found'
            })
        }

        res.json({
            success:true,
            job,
        })
        
    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}