'use client';

import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 py-10 px-6 md:px-16">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-10 border-b pb-8">
      
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-black flex items-center gap-1">
            BlogPress
          </h1>
          <p className="text-sm max-w-sm">
            Enjooy Blogging, While Enriching Content Alongside
            Brainstorming Stunning Ideas
          </p>
        </div>


        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-black">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Project Protection</li>
            <li>FAQs</li>
          </ul>
        </div>


        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-black">Help</h3>
          <ul className="space-y-1 text-sm">
            <li>Getting Started</li>
            <li>Feedback</li>
            <li>Refereal Program</li>
            <li>Network Status</li>
            <li>FAQ</li>
          </ul>
        </div>


        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-semibold text-black">Email</h3>

          <div className="flex items-center gap-2 border rounded px-3 py-2 w-full max-w-xs">
            <Mail className="text-gray-400 w-4 h-4" />
            <input
              type="email"
              placeholder="Input Placeholder"
              className="outline-none bg-transparent w-full text-sm"
            />
            <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>

          <div className="flex gap-3 mt-4 text-gray-600">
            <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
            <MessageCircle className="w-5 h-5 hover:text-green-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="pt-6 text-sm text-center text-gray-500">
        © Copyright 2024 Enjooy Design All right Reserved
      </div>
    </footer>
  );
}
