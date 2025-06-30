import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
// import slugify from 'slugify';

export async function POST(req) {
  try {
    const { title, slug, content } = await req.json();

    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }


    await connectDB();

    // const slug = slugify(title, { lower: true, strict: true });

    const post = new Post({ title, content, slug });
    await post.save();

    return new Response(JSON.stringify({ message: 'Post created', post }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


