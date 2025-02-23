import mongoose from "mongoose";

export class Database {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(process.env.MONGO_URI as string);
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            process.exit(1);
        }
    }
}

