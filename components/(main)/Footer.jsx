"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700 dark:text-gray-300">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400">
            Trippz-AI
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Smart AI-powered travel planner. Discover, plan, and explore with
            ease. 🌍
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Company
          </h3>
          <ul className="space-y-1">
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Blog
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Careers
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Support
          </h3>
          <ul className="space-y-1">
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Help Center
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Contact Us
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              FAQs
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Legal
          </h3>
          <ul className="space-y-1">
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-teal-500 cursor-pointer transition-colors">
              Cookies
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Trippz-AI. All rights reserved.
      </div>
    </footer>
  );
}
