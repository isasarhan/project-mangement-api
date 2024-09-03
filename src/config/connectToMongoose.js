import mongoose from "mongoose";

export const connectToMongoose = async (connectionStr) => {
    try {
        await mongoose.connect(connectionStr)
        console.log('connected to mongoose...');
        
    } catch (error) {
        console.log('error connecting to database', error.message);
    }
}