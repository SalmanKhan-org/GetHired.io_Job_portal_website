import mongoose from "mongoose";

// connect to Database 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log("Connect to DB successfully");
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;