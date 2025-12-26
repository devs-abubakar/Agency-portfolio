import React from "react";
import { Github, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                A
              </div>
              <span className="text-xl font-black tracking-tight uppercase text-white">
                Aivora Digitals
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              We empower ambitious brands with cutting-edge digital products and performance marketing strategies.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-blue-600 transition-colors">
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-bold mb-4 text-white uppercase tracking-widest text-xs">
              Services
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Marketing & Ads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  AI Chatbots
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Graphic Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Storify (E-com)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold mb-4 text-white uppercase tracking-widest text-xs">
              Company
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-bold mb-4 text-white uppercase tracking-widest text-xs">
              Newsletter
            </h5>
            <p className="text-sm mb-4">
              Stay updated with digital trends and case studies.
            </p>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 focus:border-blue-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
                <ArrowUp className="w-4 h-4 rotate-45 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-2 md:space-y-0">
          <p>© 2025 Aivora Digitals. All rights reserved.</p>
          <p>Handcrafted for excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
