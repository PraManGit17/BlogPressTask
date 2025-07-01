import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
import { getTokenData } from '@/lib/getTokenData';

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { email } = await getTokenData(token);

    await connectDB();
    const posts = await Post.find({ userEmail: email });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
