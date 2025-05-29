import jwt, { decode } from 'jsonwebtoken'
import Company from '../models/companySchema.js'

export const authCompany = async (req,res,next)=>{
    const token = req.headers.token

    if(!token){ 
        res.json({
            success:false,
            message: 'Unauthorized, Login again'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const companydata = await Company.findById(decoded.id).select('-password')

        req.company = companydata
        next()

    }catch(err){
        res.json({
            success:false,
            error:err.message
        })
    }
}