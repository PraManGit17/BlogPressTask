import { connectDB } from '@/lib/db';
import Post from '@/models/Post';

export async function GET(req) {
  try {
    const slug = req.url.split('/').pop(); // ✅ Extracting slug manually

    await connectDB();
    const post = await Post.findOne({ slug });

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

