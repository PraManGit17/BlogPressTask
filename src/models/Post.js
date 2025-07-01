// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   slug: String,
//   userEmail: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// export default mongoose.models.Post || mongoose.model('Post', postSchema);

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Ensures slug uniqueness
  userEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
