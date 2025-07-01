

// import { connectDB } from '@/lib/db';
// import Post from '@/models/Post';
// import { getTokenData } from '@/lib/getTokenData';
// import slugify from 'slugify';

// export async function POST(req) {
//   try {
//     const token = req.cookies.get('token')?.value;

//     if (!token) {
//       return new Response(JSON.stringify({ error: 'Unauthorized - No token found' }), { status: 401 });
//     }

//     const userData = await getTokenData(token);
//     console.log("Decoded userData from token:", userData);

//     if (!userData || !userData.email) {
//       return new Response(JSON.stringify({ error: 'Unauthorized - Email not found in token' }), { status: 401 });
//     }

//     const { email } = userData;
//     const { title, content } = await req.json();

//     if (!title || !content) {
//       return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
//     }

//     await connectDB();

//     const slug = slugify(title, { lower: true, strict: true });

//     const post = new Post({ title, content, slug, userEmail: email });
//     await post.save();

//     return new Response(JSON.stringify({ message: 'Post created', post }), { status: 201 });

//   } catch (error) {
//     console.error('Error creating post:', error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
import { getTokenData } from '@/lib/getTokenData';
import slugify from 'slugify';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized - No token found' }), { status: 401 });
    }

    const userData = await getTokenData(token);
    const { email } = userData || {};

    if (!email) {
      return new Response(JSON.stringify({ error: 'Unauthorized - Email not found in token' }), { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing title or content' }), { status: 400 });
    }

    await connectDB();

    const slug = slugify(title, { lower: true, strict: true });

    const exists = await Post.findOne({ slug });
    if (exists) {
      return new Response(JSON.stringify({ error: 'Slug already exists. Choose a different title.' }), { status: 400 });
    }

    const sanitizedContent = DOMPurify.sanitize(content);

    const post = new Post({ title, content: sanitizedContent, slug, userEmail: email });
    await post.save();

    return new Response(JSON.stringify({ message: 'Post created', post }), { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
