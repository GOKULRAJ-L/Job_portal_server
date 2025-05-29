import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log('Connected to Database');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
    }
    catch(err){
        console.log(err.message)
    }
}