# 📝 BlogPress

🔗 **Live Site:** : https://blog-press-task-9zwr8qgbk-prathams-projects.vercel.app/
---

## 📖 Description

**BlogPress** is a full-stack blog platform where authenticated admins can create, update, and delete rich-text blog posts using a WYSIWYG editor. It supports dynamic post rendering via SEO-friendly slugs, stores data in MongoDB, and includes secure authentication with JWT and cookies. The interface is responsive and animated with GSAP for a smooth UX.

---

## 🚀 Tech Stack

### ✅ Frontend (Next.js + Tailwind CSS)
- App Router architecture
- Tiptap rich text editor
- Responsive layout with animations (GSAP)
- SEO dynamic routing via slugs

### 🛠 Backend (Next.js API + MongoDB)
- REST-style API routes
- MongoDB + Mongoose integration
- Secure JWT-based auth using cookies
- Dynamic meta tag generation

---

## ✨ Features

- 🔐 Admin Authentication (Signup / Login / Logout)
- 📝 Create and edit blog posts with Tiptap editor
- 🗂 SEO-friendly slugs auto-generated from titles
- 📄 View blog posts via dynamic slug routes
- 🧾 CRUD operations on posts (MongoDB)
- 💡 Dynamic meta tags for each post
- ⚙️ Secure middleware for protected admin routes
- 🎨 Responsive UI with GSAP animations

---

## 📁 Folder Structure

src/
│
├── app/
│ ├── admin/
│ │ ├── activity/
│ │ │ └── [slug]/page.js # Edit Post page
│ │ └── create/page.js # Create Post page
│ │
│ ├── api/
│ │ ├── activity/
│ │ │ └── [slug]/route.js # PUT & DELETE blog post
│ │ ├── login/route.js # Login endpoint
│ │ ├── logout/route.js # Logout endpoint
│ │ ├── posts/
│ │ │ ├── [slug]/route.js # GET single post
│ │ │ └── create/route.js # POST new post
│ │ └── signup/route.js # Signup endpoint
│ │
│ ├── login/page.js # Login page
│ ├── signup/page.js # Signup page
│ ├── posts/
│ │ └── [slug]/page.js # Public blog view page
│ ├── font.js # Custom fonts (if used)
│ ├── layout.js # Global layout
│ ├── page.js # Landing page
│ └── globals.css # Global styles
│
├── components/
│ ├── Editform/Editform.js # Form for editing post
│ ├── Postform/PostForm.js # Form for creating post
│ ├── Footer.js # Footer component
│ ├── HeroSection.js # Hero section on homepage
│ ├── Navbar.js # Navbar
│ └── PostList.js # Lists all posts
│
├── lib/
│ ├── auth.js # Auth middleware
│ ├── db.js # MongoDB connection
│ └── getTokenData.js # Extracts user data from token
│
├── models/
│ ├── Admin.js # Admin schema
│ └── Post.js # Post schema
│
└── middleware.js # JWT middleware logic

## Clone the repo

```bash
git clone https://github.com/your-username/blogpress.git
cd blogpress

## Install dependencies

```bash
npm install

## Create .env.local

```bash
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key


## Run the dev server

```bash
npm run dev

## Visit Your App

---


---

## 📦 Required Packages

Your `package.json` includes the following critical dependencies:

```json
"dependencies": {
  "next": "15.3.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "mongoose": "^8.16.1",
  "slugify": "^1.6.6",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "cookie": "^1.0.2",
  "dompurify": "^3.2.6",
  "@tiptap/react": "^2.23.0",
  "@tiptap/starter-kit": "^2.23.0",
  "@tiptap/extension-placeholder": "^2.23.0",
  "dotenv": "^17.0.0",
  "lucide-react": "^0.525.0",
  "gsap": "^3.13.0"
}
