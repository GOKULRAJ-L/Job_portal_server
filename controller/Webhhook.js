import { Webhook } from "svix";
import User from "../models/UserSchema.js";

export const clerkWebhooks = async(req,res)=>{
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(
            JSON.stringify(req.body),
            {
                'svix-id': req.headers['svix-id'],
                'svix-timestamp': req.headers['svix-timestamp'],
                'svix-signature': req.headers['svix-signature']
            }
        );

        const{data,type} = req.body;

        switch(type){

            case 'user.created':
                const userData = {
                    _id:data.id,
                    name:data.firstname + ' ' + data.lastname,
                    email:data.email_addresses[0].email_address,
                    image:data.image_url,
                    resume:''
                }
                await User.create(userData)
                break;


            case 'user.updated':
                const updateUserData = {
                    name:data.firstname + ' ' + data.lastname,
                    email:data.email_addresses[0].email_address,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id, updateUserData, { new: true })
                break;


            case 'user.deleted':
                await User.findByIdAndDelete(data.id)
                break;


            default:
                console.log('Unhandled event type:', type);
        }

    }catch(err){
        res.json({
            success:false,
            error : err.message
        })
    }

}