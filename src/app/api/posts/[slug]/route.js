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

export async function PUT(req) {
  try {
    const slug = req.url.split('/').pop(); // ✅

    const { title, content } = await req.json();
    await connectDB();

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const slug = req.url.split('/').pop(); // ✅

    await connectDB();
    await Post.findOneAndDelete({ slug });

    return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
