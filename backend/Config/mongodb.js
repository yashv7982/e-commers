import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB Connected');
    });

    try {
        await mongoose.connect(`mongodb+srv://yashv7982:Mukul1234@e-commerc.s2uym.mongodb.net/e-commerce`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection successful.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);  // Exits the process if the connection fails
    }
}

export default connectDB;
