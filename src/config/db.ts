import mongoose from 'mongoose'
import { exit } from 'node:process'


export const connectDB = async ()=>{

    try {
       
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        
    } catch (error) {
        console.log('Error Connectiom: ',error)
        exit(1)
    }

}

