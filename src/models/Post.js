import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
  userEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
