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
