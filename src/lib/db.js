
import mongoose from 'mongoose';

export const connectDB = async () => {
  // const MONGODB_URI="mongodb+srv://pra172005:praman17@blogpresscluster.qflcymk.mongodb.net/BlogPress?retryWrites=true&w=majority&appName=BlogPressCluster";
  
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Mongo already connected");
      return;
    }

    console.log("MONGODB_URI from env:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};