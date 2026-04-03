import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/online-voting-system";

async function run() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");
        
        const res = await mongoose.connection.collection("votes").dropIndexes();
        console.log("Dropped previously defined unique indexes for Votes allowing the new role structure:", res);
        
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

run();
