'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { MousePointer2, Sparkles, TrendingUp, Zap } from 'lucide-react';
import gsap from 'gsap';
import AiOrb from './AiOrb';

const Hero = () => {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          titleRef.current.children,
          {
            y: 80,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
          },
          '-=0.2'
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          btnRef.current.children,
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          '-=0.4'
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-brand-dark z-10">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-400/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      {/* 3D AI Orb */}
{/* 3D AI Orb */}
<div className="absolute inset-0 opacity-40 z-0 pointer-events-auto">
  <AiOrb />
</div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pointer-events-none">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen AI Solutions</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
        >
          <span className="block text-white">AI Powered</span>
          <span className="block bg-linear-to-r from-blue-400 via-blue-600 to-indigo-400 bg-clip-text text-transparent">
            Business Growth
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed"
        >
          <span className='font-bold'>
          AI is your edge.
          </span>
           Your competitors are already using it — will you?
At Aivora Digitals, we help businesses unlock their full potential using AI-powered systems that generate leads and drive growth.
          
        </p>

        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button className="relative group overflow-hidden bg-blue-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/30">
            <span className="relative z-10">Launch Your Project</span>
            <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button className="px-10 py-5 rounded-2xl font-bold text-lg border border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all">
            View Case Studies
          </button>
        </div>

        {/* Badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-60">
          <div className="flex items-center space-x-2 justify-center">
            <TrendingUp className="text-blue-400" />
            <span className="font-semibold text-sm">300% Avg ROI</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <MousePointer2 className="text-blue-400" />
            <span className="font-semibold text-sm">Expert UX/UI</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Zap className="text-blue-400" />
            <span className="font-semibold text-sm">Lightning Fast Code</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Sparkles className="text-blue-400" />
            <span className="font-semibold text-sm">AI Integrated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
