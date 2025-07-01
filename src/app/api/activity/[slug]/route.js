import { connectDB } from '@/lib/db';
import Post from '@/models/Post';
import { getTokenData } from '@/lib/getTokenData';



// export async function PUT(req) {
//   try {
//     const slug = req.url.split('/').pop(); // ✅

//     const { title, content } = await req.json();
//     await connectDB();

//     const updatedPost = await Post.findOneAndUpdate(
//       { slug },
//       { title, content },
//       { new: true }
//     );

//     if (!updatedPost) {
//       return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify(updatedPost), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }

export async function PUT(req) {

  try {
    const slug = req.url.split('/').pop();
    const token = req.cookies.get('token')?.value;

    if (!token) return new Response(JSON.stringify({
      error: 'Unauthorized'
    }),
      {
        status: 401
      }
    )

    const { email } = await getTokenData(token);

    const { title, content } = await req.json();
    await connectDB();

    const post = await Post.findOne({ slug });

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    if (post.userEmail !== email) {
      return new Response(JSON.stringify({ error: 'Forbidden: Not your post' }), { status: 403 });
    }

    post.title = title;
    post.content = content;
    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });


  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// export async function DELETE(req) {
//   try {
//     const slug = req.url.split('/').pop(); // ✅

//     await connectDB();
//     await Post.findOneAndDelete({ slug });

//     return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


export async function DELETE(req) {
  try {
    const slug = req.url.split('/').pop();
    const token = req.cookies.get('token')?.value;
    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { email } = await getTokenData(token);

    await connectDB();

    const post = await Post.findOne({ slug });

    if (!post) return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });

    if (post.userEmail !== email) {
      return new Response(JSON.stringify({ error: 'Forbidden: Not your post' }), { status: 403 });
    }

    await Post.deleteOne({ slug });

    return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
