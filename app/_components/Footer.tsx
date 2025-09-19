// components/Footer.tsx
'use client'
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 dark:text-gray-300">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400">Trippz-AI</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Smart AI-powered travel planner. Discover, plan, and explore with ease. 🌍
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Trippz-AI. All rights reserved.
      </div>
    </footer>
  );
}
