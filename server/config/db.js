import mongoose, {mongo} from "mongoose";

const connectDB = async () => {
    try {
        const connectDbb = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connectDbb.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;