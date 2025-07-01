
import mongoose from 'mongoose';

export const connectDB = async () => {
  
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