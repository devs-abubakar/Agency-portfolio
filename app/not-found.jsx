'use client';
import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import CustomCursor from './components/Customcursor';

export default function NotFound() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-white">
      {/* Dynamic Background Blurs */}
      <CustomCursor/>
      <div className="absolute inset-0">
        <div
          className="absolute w-80 h-80 rounded-full blur-2xl opacity-60 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 animate-pulse"
          style={{
            transform: `translate(${mouse.x * 50}px, ${mouse.y * 50}px)`,
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-indigo-500 via-blue-400 to-cyan-300 animate-pulse"
          style={{
            transform: `translate(${mouse.x * -30}px, ${mouse.y * -30}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        {/* AI Core / Orb */}
        <div className="mx-auto mb-10 relative w-44 h-44">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 blur-3xl opacity-60 animate-pulse"
            style={{
              transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
            }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border border-white/10 animate-pulse" />
        </div>

        <p className="text-blue-400 text-sm tracking-widest uppercase mb-4">
          System Error
        </p>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 relative">
          <span className="absolute left-0 top-0 text-7xl md:text-[9rem] text-blue-500/10 font-black select-none pointer-events-none">
            404
          </span>
          Page Not Found
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          The route you accessed doesn’t exist — or it was removed.
          Either way, this node is no longer reachable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="relative inline-flex items-center gap-2 bg-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-blue-500/30 hover:shadow-blue-600/50"
          >
            <ArrowLeft size={18} />
            Return Home
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-25 blur-xl"></span>
          </Link>

          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 transition-all"
          >
            <Zap size={18} />
            Contact Support
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-xl"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
