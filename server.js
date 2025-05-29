import "./config/instrument.js";
import express from 'express'
import * as Sentry from "@sentry/node";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import companyRouter from './routes/CompanyRouter.js'
import connectCd from "./config/Cloudinary.js";
import jobroutes from './routes/jobRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhooks } from "./controller/Webhhook.js";


//Intialization
dotenv.config()
const app = express();
await connectDB();
await connectCd();


//middleware
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json())
app.use('/recuriter',companyRouter)
app.use('/public',jobroutes)
app.use('/user',userRoutes)
app.use('/webhooks',clerkWebhooks)




// routes
app.get('/',(req,res)=>{
    res.send('Job Portal API is running')
})



//port 
const PORT = 3000 || process.env.PORT
//sentry error catching Technique
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is the running on the ${PORT}`)
})

